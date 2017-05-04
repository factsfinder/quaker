import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import getEarthquakeReducer from './reducers/reducers.js';

export default createStore(getEarthquakeReducer, {},
  applyMiddleware(thunk, createLogger())
);
