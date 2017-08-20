const initialState = {
    social: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_SOCIAL_SUCCESS':
          return action;
    default:
          return state;
  }
};
