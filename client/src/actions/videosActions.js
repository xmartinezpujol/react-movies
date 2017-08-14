// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchVideosSuccess = (videos) => ({
    type: 'FETCH_VIDEOS_SUCCESS',
    isFetching: false,
    videos
});

//Async Action
export const fetchVideos = (id) => {
  return (dispatch) => {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=${API_LANG}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchVideosSuccess(res.results));
      })
      .catch(error => {
        throw(error);
      });
  };
};
