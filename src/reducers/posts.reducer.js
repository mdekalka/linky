import { POSTS } from '../constants/constants';

const { LOAD_POST_REQUEST,
        LOAD_POST_SUCCESS,
        LOAD_POST_FAILURE,
        TOGGLE_FAVOURITE_POST } = POSTS;
const initialState = {
    items: [],
    isFetching: false,
    errorMessage: null,
    activePost: {}
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_POST_REQUEST:
            return { ...state, isFetching: true };

        case LOAD_POST_SUCCESS:
            return { ...state, isFetching: false, items: action.posts };

        case LOAD_POST_FAILURE:
            return { ...state, isFetching: false, errorMessage: action.error };

        case 'UPDATING_POST_REQUEST':
            const updatedAfterRequest = state.items.filter(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    post.isFetching = true;

                    return post;
                }
            });

            return { ...state, items: updatedAfterRequest };

        case 'UPDATING_POST_SUCCESS':
            const updatedAfterSuccess = state.items.filter(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    post.isFetching = false;

                    return post;
                }
            });

            return { ...state, items: updatedAfterSuccess };

        case 'UPDATING_POST_FAILURE':
            const updatedAfterFailure = state.items.filter(post => {
                if (post._id.$oid !== action.id) {
                    return post;
                } else {
                    post.isFetching = false;

                    return post;
                }
            });

            return { ...state, items: updatedAfterFailure };
        

        default:
            return state;
    }
};

export default postReducer;