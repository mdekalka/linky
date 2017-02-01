import { createStore, applyMiddleware  } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger';

import rootReducer from '../reducers/root.reducer';
import dbService from '../services/db.service';
import { root } from '../actions/starwars.actions';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// create the logger middleware
const logger = createLogger();

let store = createStore(rootReducer, {}, applyMiddleware(thunk.withExtraArgument(dbService), logger, sagaMiddleware));

sagaMiddleware.run(root);

export default store;