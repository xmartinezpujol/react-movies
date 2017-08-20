// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchSocialSuccess = (social) => ({
    type: 'FETCH_SOCIAL_SUCCESS',
    isFetching: false,
    social
});

//Async Action
export const fetchSocial = (id) => {
  return (dispatch) => {
    return fetch(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${API_KEY}&language=${API_LANG}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchSocialSuccess(res));
      })
      .catch(error => {
        throw(error);
      });
  };
};
