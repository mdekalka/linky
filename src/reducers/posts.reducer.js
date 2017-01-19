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

        case TOGGLE_FAVOURITE_POST:
            const updatedPosts = state.items.filter(post => {
                if (post._id.$oid !== action.id) {
                    return post
                } else {
                    post.isFavourite = !post.isFavourite;
                    return post;
                }
            });

            return { ...state, items: updatedPosts }

        default:
            return state;
    }
};

export default postReducer;