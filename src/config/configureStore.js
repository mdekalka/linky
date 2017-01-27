import { createStore, applyMiddleware  } from 'redux';
import rootReducer from '../reducers/root.reducer';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga'
import createLogger from 'redux-logger';
import dbService from '../services/db.service';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// create the logger middleware
const logger = createLogger();

let store = createStore(rootReducer, {}, applyMiddleware(thunk.withExtraArgument(dbService), logger), sagaMiddleware);

export default store;