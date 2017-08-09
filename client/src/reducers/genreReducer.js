export default (state = [], action) => {
  switch (action.type) {
    case 'FETCH_GENRES_SUCCESS':
          return action;
    default:
          return state;
  }
};
