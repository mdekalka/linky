import keyMirror from 'keymirror';

export const POSTS_ACTIONS = keyMirror({
    LOAD_POST_REQUEST: null,
    LOAD_POST_SUCCESS: null,
    LOAD_POST_FAILURE: null,
    TOGGLE_FAVOURITE_POST: null,
    UPDATING_POST_REQUEST: null,
    UPDATING_POST_SUCCESS: null,
    UPDATING_POST_FAILURE: null,
    DELETING_POST_REQUEST: null,
    DELETING_POST_SUCCESS: null,
    DELETING_POST_FAILURE: null,
    ADDING_POST_SUCCESS: null,
    SET_ACTIVE_POST: null
});

export const POSTS = {
    PAGE_SIZE: 25
};

export const FILTERS_ACTIONS = keyMirror({
    UPDATING_FILTERS: null,
    RESETING_FILTERS: null
});