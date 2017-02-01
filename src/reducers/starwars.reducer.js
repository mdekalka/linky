import { combineReducers } from 'redux';

const initialState = {
    items: [],
    isFetching: false,
    errorMessage: ''
};

const loadRequest = (state) => {
    return { ...state, errorMessage: '', isFetching: true} ;
};

const loadSuccess = (state, action) => {
    return { ...state, errorMessage: '', isFetching: false, items: action.data };
};

const loadFailure = (state, action) => {
    return { ...state, errorMessage: action.errorMessage, isFetching: false }
};

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PEOPLE_LOAD_REQUEST':
            return loadRequest(state);

        case 'PEOPLE_LOAD_SUCCESS':
            return loadSuccess(state, action);

        case 'PEOPLE_LOAD_FAILURE':
            return loadFailure(state, action);

        default:
            return state;
    }
};


const initialFilmsState = {
    items: [],
    isFetching: false,
    errorMessage: ''
};
const filmsReducer = (state = initialFilmsState, action) => {
    switch (action.type) {
        case 'FILMS_LOAD_REQUEST':
            return loadRequest(state);

        case 'FILMS_LOAD_SUCCESS':
            return loadSuccess(state, action);

        case 'FILMS_LOAD_FAILURE':
            return loadFailure(state, action);

        default:
            return state;
    }
}

const initialActionState = [];
const actionReducer = (state = initialActionState, action) => {
    switch (action.type) {
        case 'PEOPLE_LOAD_REQUEST_SAGA':
        case 'FILMS_LOAD_REQUEST_SAGA':
        case 'PEOPLE_LOAD_REQUEST':
        case 'PEOPLE_LOAD_SUCCESS':
        case 'PEOPLE_LOAD_FAILURE':
        case 'FILMS_LOAD_REQUEST':
        case 'FILMS_LOAD_SUCCESS':
        case 'FILMS_LOAD_FAILURE':
            return [ ...state, action.type ] ;

        default:
            return state;  
    }
}

const starWarsReducer = combineReducers({
    people: peopleReducer,
    films: filmsReducer,
    actions: actionReducer
});

export default starWarsReducer;