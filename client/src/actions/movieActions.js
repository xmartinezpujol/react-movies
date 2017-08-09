// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=${API_LANG}`;

// Sync Action
export const fetchMoviesSuccess = (movies) => {
  return {
    type: 'FETCH_MOVIES_SUCCESS',
    movies
  }
};

//Async Action
export const fetchMovies = () => {
  // Returns a dispatcher function
  // that dispatches an action at a later time
  return (dispatch) => {
    // Returns a promise
    return fetch(url)
      .then(response => response.json())
      .then(res => {
        // Dispatch another action
        // to consume data
        console.log(res);
        dispatch(fetchMoviesSuccess(res))
      })
      .catch(error => {
        throw(error);
      });
  };
};
