import { POSTS } from '../constants/constants';
import { createSelector } from 'reselect'

const { LOAD_POST_REQUEST,
        LOAD_POST_SUCCESS,
        LOAD_POST_FAILURE } = POSTS;
const initialState = {
    items: [],
    isFetching: false,
    hasMoreItems: true,
    isFirstLoad: true,
    errorMessage: '',
    activeId: ''
};

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
            return { ...state, isFetching: false, errorMessage: '', isFirstLoad: false, items: [ ...state.items, ...action.posts ] };

        case LOAD_POST_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.error };

        case 'UPDATING_POST_REQUEST':
            return { ...state, items: updatePostReducer(state.items, action) };

        case 'UPDATING_POST_SUCCESS':
            return { ...state, items: updatePostReducer(state.items, action) };

        case 'UPDATING_POST_FAILURE':
            return { ...state, items: updatePostReducer(state.items, action) };

        case 'SET_ACTIVE_POST':
            return { ...state, activeId: action.id };

        default:
            return state;
    }
};

const getPosts = (state) => state.posts.items;
const getActiveId = (state) => state.posts.activeId;

export const selectActivePost = createSelector([getActiveId, getPosts], (id, posts) => {
    return posts.find(post => post._id.$oid === id) || {};
});

export default postReducer;