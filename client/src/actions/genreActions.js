import * as loadingActions from './loadingActions';

// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${API_LANG}`;

// Sync Action
export const fetchGenresSuccess = (genres) => ({
    type: 'FETCH_GENRES_SUCCESS',
    genres,
    isFetching: false
  });

//Async Action
export const fetchGenres = () => {
  return (dispatch) => {
    return fetch(url)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchGenresSuccess(res.genres));
        dispatch(loadingActions.loadingDone());
      })
      .catch(error => {
        throw(error);
      });
  };
};
