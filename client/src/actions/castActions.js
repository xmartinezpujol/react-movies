// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchCastSuccess = (cast) => ({
    type: 'FETCH_CAST_SUCCESS',
    isFetching: false,
    cast
});

//Async Action
export const fetchCast = (id) => {
  return (dispatch) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=${API_LANG}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchCastSuccess(res.cast));
      })
      .catch(error => {
        throw(error);
      });
  };
};
