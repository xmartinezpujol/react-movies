const initialState = {
    movies: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_SUCCESS':
          return action;
    default:
          return state;
  }
};
