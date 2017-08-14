import { combineReducers } from 'redux';
import genres from './genreReducer';
import user from './userReducer';
import movie from './movieReducer';
import movies from './moviesReducer';
import loading from './loadingReducer';
import list from './listReducer';
import cast from './castReducer';
import videos from './videosReducer';
import recommendations from './recommendationsReducer';

const rootReducer = combineReducers({
  // short hand property names
  genres,
  user,
  movie,
  movies,
  loading,
  list,
  cast,
  videos,
  recommendations
})

export default rootReducer;
