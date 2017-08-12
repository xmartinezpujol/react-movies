import {combineReducers} from 'redux';
import genres from './genreReducer';
import user from './userReducer';
import movie from './movieReducer';
import loading from './loadingReducer';
import list from './listReducer';
import cast from './castReducer';

const rootReducer = combineReducers({
  // short hand property names
  genres,
  user,
  movie,
  loading,
  list,
  cast
})

export default rootReducer;
