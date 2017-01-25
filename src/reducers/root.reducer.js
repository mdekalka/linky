import { combineReducers } from 'redux';

import postReducer from './posts.reducer';
import filtersReducer from './filters.reducer';

const rootReducer = combineReducers({
    posts: postReducer,
    filters: filtersReducer
});

export default rootReducer;