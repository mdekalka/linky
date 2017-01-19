import { POSTS } from '../constants/constants';
import dbService from '../services/db.service';

const { LOAD_POST_REQUEST,
        LOAD_POST_SUCCESS,
        LOAD_POST_FAILURE,
        TOGGLE_FAVOURITE_POST } = POSTS;

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

    // dispatch(updatingPost(id));

    // return dbService.updatePost(id, favourite)
    //     .then(updatedPost => {
    //         dispatch(successUpdatingPost(id, updatedPost));
    //     })
    //     .catch(error => {
    //         dispatch(rejectUpdatingPost(id, error));
    //     });
};

