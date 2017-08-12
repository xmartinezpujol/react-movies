const initialState = {
    cast: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CAST_SUCCESS':
          return action;
    default:
          return state;
  }
};
