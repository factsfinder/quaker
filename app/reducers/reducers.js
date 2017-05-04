import { combineReducers } from 'redux';
import getEarthquakeReducer from './getEarthquakeReducer.js';


const reducers = combineReducers({
  getEarthquakeReducer,
});

export default reducers;
