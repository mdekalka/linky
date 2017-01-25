export const updateFilters = (filters) => {
    return {
        type: 'UPDATING_FILTERS',
        filters
    }
};

export const resetFilters = () => {
    return {
        type: 'RESETING_FILTERS'
    }
};


