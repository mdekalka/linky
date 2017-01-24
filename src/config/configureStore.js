import { createStore, applyMiddleware  } from 'redux';
import rootReducer from '../reducers/root.reducer';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import dbService from '../services/db.service';

const logger = createLogger();

let store = createStore(rootReducer, {}, applyMiddleware(thunk.withExtraArgument(dbService), logger));

export default store;