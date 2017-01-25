import { POSTS_ACTIONS } from '../constants/constants';
import { POSTS } from '../constants/constants';
import { createSelector } from 'reselect'

const { LOAD_POST_REQUEST,
        LOAD_POST_SUCCESS,
        LOAD_POST_FAILURE } = POSTS_ACTIONS;
const initialState = {
    items: [],
    isFetching: false,
    hasMoreItems: true,
    isFirstLoad: true,
    errorMessage: '',
    activeId: ''
};
const { PAGE_SIZE } = POSTS;

const updatePostReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATING_POST_REQUEST':
            return state.map(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    return  { ...post,  isFetching: true };
                }
            });

        case 'UPDATING_POST_SUCCESS':
            return state.map(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    return{ ...post, ...action.post, isFetching: false };
                }
            });

        case 'UPDATING_POST_FAILURE':
            return state.map(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    return { ...post, isFetching: false };
                }
            });

        default:
            return state;
    }
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POST_REQUEST:
            return { ...state, isFetching: true, errorMessage: '' };

        case LOAD_POST_SUCCESS:
            // Note: mlab does not provide total property in query request(only in separate request)
            // If items length less than PAGE_SIZE - that means all items already received
            const hasMoreItems = (action.posts.length && action.posts.length === PAGE_SIZE) ? true : false;

            return { ...state, isFetching: false, errorMessage: '', hasMoreItems, isFirstLoad: false, items: [ ...state.items, ...action.posts ] };

        case LOAD_POST_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.error };

        case 'UPDATING_POST_REQUEST':
        case 'UPDATING_POST_SUCCESS':
        case 'UPDATING_POST_FAILURE':
            return { ...state, items: updatePostReducer(state.items, action) };

        case 'ADDING_POST_SUCCESS':
            return { ...state, items: [ ...state.items, action.post ] };

        case 'SET_ACTIVE_POST':
            return { ...state, activeId: action.id };

        default:
            return state;
    }
};

const getPosts = (state) => state.posts.items;
const getActiveId = (state) => state.posts.activeId;
const getFilters = (state) => state.filters;


export const selectActivePost = createSelector([getActiveId, getPosts], (id, posts) => {
    return posts.find(post => post._id.$oid === id) || {};
});

export const selectPostsByFilters = createSelector([getPosts, getFilters], (posts, filters) => {
    const query = filters.query.toLowerCase();
    const { activeLabel, isFavourite } = filters;

    let resultPosts = posts.filter(post => post.title.toLowerCase().includes(query));

    if (activeLabel.name) {
        resultPosts = resultPosts.filter(post => post.activeLabel.name === activeLabel.name);
    }

    if (isFavourite) {
        resultPosts = resultPosts.filter(post => post.isFavourite);
    }

    return resultPosts;
});


export default postReducer;