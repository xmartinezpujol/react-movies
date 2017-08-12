const initialState = {
    movie: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIE_SUCCESS':
          return action;
    default:
          return state;
  }
};
