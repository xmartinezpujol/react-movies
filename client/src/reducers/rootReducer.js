import {combineReducers} from 'redux';
import genres from './genreReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  // short hand property names
  genres,
  user
})

export default rootReducer;
