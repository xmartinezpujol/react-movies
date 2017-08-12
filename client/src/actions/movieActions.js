import * as loadingActions from './loadingActions';

// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchMovieSuccess = (movie) => ({
    type: 'FETCH_MOVIE_SUCCESS',
    isFetching: false,
    movie
});

//Async Action
export const fetchMovie = (id) => {
  return (dispatch) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${API_LANG}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchMovieSuccess(res));
        dispatch(loadingActions.loadingDone());
      })
      .catch(error => {
        throw(error);
      });
  };
};
