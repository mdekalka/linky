import { combineReducers } from 'redux';

import postReducer from './posts.reducer';
import filtersReducer from './filters.reducer';
import starWarsReducer from './starwars.reducer';

const rootReducer = combineReducers({
    posts: postReducer,
    filters: filtersReducer,
    starWars: starWarsReducer
});

export default rootReducer;