import * as loadingActions from './loadingActions';

// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchListSuccess = (list) => ({
    type: 'FETCH_LIST_SUCCESS',
    isFetching: false,
    list
});

//Async Action
export const fetchList = (url, sort) => {
  return (dispatch) => {
    //dispatch(loadingActions.loadingStarted());
    return fetch(`https://api.themoviedb.org/3/${url}?api_key=${API_KEY}${sort}&language=${API_LANG}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchListSuccess(res.results));
      })
      .catch(error => {
        throw(error);
      });
  };
};
