import { POSTS } from '../constants/constants';
import dbService from '../services/db.service';

const { LOAD_POST_REQUEST,
        LOAD_POST_SUCCESS,
        LOAD_POST_FAILURE,
        TOGGLE_FAVOURITE_POST } = POSTS;

const requestPosts = (url) => {
    return {
        type: LOAD_POST_REQUEST,
        url
    }
};

const receivePosts = (posts) => {
    return {
        type: LOAD_POST_SUCCESS,
        posts
    }
};

const rejectPosts = (error) => {
    return {
        type: LOAD_POST_FAILURE,
        error
    }
}

export const toggleFavourite = (id) => {
    return {
        type: TOGGLE_FAVOURITE_POST,
        id
    }
};

export const loadPosts = (url) => (dispatch, /*getState*/) => {
    dispatch(requestPosts(url));

    return dbService.getPosts()
        .then(posts => {
            dispatch(receivePosts(posts));
        })
        .catch(err => {
            dispatch(rejectPosts(err));
        });
};

