// API CONFIG
const API_KEY = '3068f3a34eb23cadda9e625ea4e903bd';
const API_LANG = 'en-US';

// Sync Action
export const fetchPersonSuccess = (person) => ({
    type: 'FETCH_PERSON_SUCCESS',
    isFetching: false,
    person
});

//Async Action
export const fetchPerson = (id) => {
  return (dispatch) => {
    return fetch(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=${API_LANG}`)
      .then(response => response.json())
      .then(res => {
        dispatch(fetchPersonSuccess(res));
      })
      .catch(error => {
        throw(error);
      });
  };
};
