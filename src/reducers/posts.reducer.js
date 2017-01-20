import { POSTS } from '../constants/constants';
import { createSelector } from 'reselect'

const { LOAD_POST_REQUEST,
        LOAD_POST_SUCCESS,
        LOAD_POST_FAILURE } = POSTS;
const initialState = {
    items: [],
    isFetching: false,
    errorMessage: '',
    activeId: ''
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POST_REQUEST:
            return { ...state, isFetching: true, errorMessage: '' };

        case LOAD_POST_SUCCESS:
            return { ...state, isFetching: false, errorMessage: '', items: action.posts };

        case LOAD_POST_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.error };

        case 'UPDATING_POST_REQUEST':
            const updatedAfterRequest = state.items.map(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    return  { ...post,  isFetching: true };
                }
            });

            return { ...state, items: updatedAfterRequest };

        case 'UPDATING_POST_SUCCESS':
            const updatedAfterSuccess = state.items.map(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    return{ ...post, ...action.post, isFetching: false };
                }
            });

            return { ...state, items: updatedAfterSuccess };

        case 'UPDATING_POST_FAILURE':
            const updatedAfterFailure = state.items.map(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    return { ...post, isFetching: false };
                }
            });

            return { ...state, items: updatedAfterFailure };

        case 'SET_ACTIVE_POST':
            return { ...state, activeId: action.id };
            // const activePost = state.items.find(post => post._id.$oid === action.id);

            // return activePost ? { ...state, activePost } : { ...state, activePost: {} }

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