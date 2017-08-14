// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchRecommendationsSuccess = (recommendations) => ({
    type: 'FETCH_RECOMMENDATIONS_SUCCESS',
    isFetching: false,
    recommendations
});

//Async Action
export const fetchRecommendations = (id) => {
  return (dispatch) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${API_KEY}&language=${API_LANG}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchRecommendationsSuccess(res.results));
      })
      .catch(error => {
        throw(error);
      });
  };
};
