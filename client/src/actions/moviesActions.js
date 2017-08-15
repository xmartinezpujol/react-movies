// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchMoviesSuccess = (movies) => ({
    type: 'FETCH_MOVIES_SUCCESS',
    isFetching: false,
    movies
});

//Async Action
export const fetchMovies = (filter, page, genreid) => {
  let url = `&sort_by=${filter}&include_adult=false&include_video=false&page=${page}`;

  if(genreid) {
    url = `&sort_by=${filter}&include_adult=false&include_video=false&page=${page}&with_genres=${genreid}`;
  }

  return (dispatch) => {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=${API_LANG}${url}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchMoviesSuccess(res.results));
      })
      .catch(error => {
        throw(error);
      });
  };
};
