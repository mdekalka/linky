import { combineReducers } from 'redux';

const initialState = {
    items: [],
    isFetching: false,
    errorMessage: ''
};

const peopleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PEOPLE_LOAD_REQUEST':
            return { ...state, errorMessage: '', isFetching: true} ;

        case 'PEOPLE_LOAD_SUCCESS':
            return { ...state, errorMessage: '', isFetching: false, items: action.data };

        case 'PEOPLE_LOAD_FAILURE':
            return { ...state, errorMessage: action.errorMessage, isFetching: false }

        default:
            return state;
    }
};

const initialActionState = [];

const actionReducer = (state = initialActionState, action) => {
    switch (action.type) {
        case 'PEOPLE_LOAD_REQUEST':
        case 'PEOPLE_LOAD_SUCCESS':
        case 'PEOPLE_LOAD_FAILURE':
            return [ ...state, action.type ] ;

        default:
            return state;  
    }
}

const starWarsReducer = combineReducers({
    people: peopleReducer,
    actions: actionReducer
});

export default starWarsReducer;