import {combineReducers} from 'redux';
import movies from './movieReducer';
import genres from './genreReducer';
import user from './userReducer';

const rootReducer = combineReducers({
  // short hand property names
  movies,
  genres,
  user
})

export default rootReducer;
