import { POSTS } from '../constants/constants';
import dbService from '../services/db.service';

const { LOAD_POST_REQUEST,
        LOAD_POST_SUCCESS,
        LOAD_POST_FAILURE } = POSTS;

// Loading posts
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

export const loadPosts = () => (dispatch, /*getState*/) => {
    dispatch(requestPosts());

    return dbService.getPosts()
        .then(posts => {
            dispatch(receivePosts(posts));
        })
        .catch(error => {
            dispatch(rejectPosts(error));
        });
};

// Toggling favourites
const requestUpdatingPost = (id) => {
    return {
        type: 'UPDATING_POST_REQUEST',
        id
    }
};

const successUpdatingPost = (id, post) => {
    return {
        type: 'UPDATING_POST_SUCCESS',
        id,
        post
    }
};

const rejectUpdatingPost = (id, error) => {
    return {
        type: 'UPDATING_POST_FAILURE',
        id,
        error
    }
};

export const updatingPost = (id, data) => (dispatch) => {
    dispatch(requestUpdatingPost(id));

    return dbService.updatePost(id, data)
        .then(updatedPost => {
            dispatch(successUpdatingPost(id, data));
        })
        .catch(error => {
            dispatch(rejectUpdatingPost(id, error));
        });
};

