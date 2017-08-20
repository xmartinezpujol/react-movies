const initialState = {
    credits: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CREDITS_SUCCESS':
          return action;
    default:
          return state;
  }
};
