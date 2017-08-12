const initialState = {
    isLoading: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_SUCCESS':
          return action;
    case 'LOADING_STARTED':
          return action;          
    default:
          return state;
  }
};
