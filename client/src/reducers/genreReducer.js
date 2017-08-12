const initialState = {
    genres: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GENRES_SUCCESS':
          return action;
    default:
          return state;
  }
};
