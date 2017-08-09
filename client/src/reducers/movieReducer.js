export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_MOVIES_SUCCESS':
          return action;
    default:
          return state;
  }
};
