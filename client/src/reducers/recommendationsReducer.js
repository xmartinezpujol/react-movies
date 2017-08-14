const initialState = {
    recommendations: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_RECOMMENDATIONS_SUCCESS':
          return action;
    default:
          return state;
  }
};
