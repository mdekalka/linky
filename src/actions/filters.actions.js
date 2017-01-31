import { FILTERS_ACTIONS } from '../constants/constants';

const { UPDATING_FILTERS, RESETING_FILTERS } = FILTERS_ACTIONS;

export const updateFilters = (filters) => {
    return {
        type: UPDATING_FILTERS,
        filters
    }
};

export const resetFilters = () => {
    return {
        type: RESETING_FILTERS
    }
};


