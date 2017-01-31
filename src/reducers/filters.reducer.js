import { FILTERS_ACTIONS } from '../constants/constants';

const { UPDATING_FILTERS, RESETING_FILTERS }  = FILTERS_ACTIONS;
const initialState = {
    activeLabel: {},
    query: '',
    isFavourite: ''
};

const filtersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATING_FILTERS:
            return { ...state, ...action.filters };

        case RESETING_FILTERS:
            return {...state, ...initialState };

        default:
            return state;
    }
};

export default filtersReducer;