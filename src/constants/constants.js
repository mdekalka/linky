import keyMirror from 'keymirror';

export const POSTS_ACTIONS = keyMirror({
    LOAD_POST_REQUEST: null,
    LOAD_POST_SUCCESS: null,
    LOAD_POST_FAILURE: null,
    TOGGLE_FAVOURITE_POST: null
});

export const POSTS = {
    PAGE_SIZE: 10
};
