import { POSTS_ACTIONS } from '../constants/constants';

const { LOAD_POST_REQUEST,
        LOAD_POST_SUCCESS,
        LOAD_POST_FAILURE } = POSTS_ACTIONS;

// Loading posts
const requestPosts = (url) => {
    return {
        type: LOAD_POST_REQUEST
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

export const loadPosts = () => (dispatch, getState, postsAPI) => {
    dispatch(requestPosts());

    return postsAPI.getPosts()
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

export const updatingPost = (id, data) => (dispatch, getState, postsAPI) => {
    dispatch(requestUpdatingPost(id));

    return postsAPI.updatePost(id, data)
        .then(() => {
            dispatch(successUpdatingPost(id, data));
        })
        .catch(error => {
            dispatch(rejectUpdatingPost(id, error));
        });
};

// Deleting post
const requestDeletingPost = (id) => {
    return {
        type: 'DELETING_POST_REQUEST',
        id
    }
};

const successDeletingPost = (id) => {
    return {
        type: 'DELETING_POST_SUCCESS',
        id
    }
};

const rejectDeletingPost = (id, error) => {
    return {
        type: 'DELETING_POST_FAILURE',
        id,
        error
    }
};

export const deletingPost = (id) => (dispatch, getState, postsAPI) => {
    dispatch(requestDeletingPost(id));

    return postsAPI.deletePost(id)
        .then(id => {
            debugger
            dispatch(successDeletingPost(id));
        })
        .catch(error => {
            dispatch(rejectDeletingPost(id, error));
        });
};


// Adding new post
export const successAddingPost = (post) => {
    return {
        type: 'ADDING_POST_SUCCESS',
        post
    }
};


// Set active post
export const setActivePost = (id) => {
    return {
        type: 'SET_ACTIVE_POST',
        id
    }
};


