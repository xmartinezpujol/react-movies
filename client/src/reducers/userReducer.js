export default (state = [], action) => {
  switch (action.type) {
    case 'GET_USER_SUCCESS':
          return action;
    default:
          return state;
  }
};
