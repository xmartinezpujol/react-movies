// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchCreditsSuccess = (credits) => ({
    type: 'FETCH_CREDITS_SUCCESS',
    isFetching: false,
    credits
});

//Async Action
export const fetchCredits = (id) => {
  return (dispatch) => {
    return fetch(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=${API_LANG}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchCreditsSuccess(res));
      })
      .catch(error => {
        throw(error);
      });
  };
};
