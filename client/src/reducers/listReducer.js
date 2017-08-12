const initialState = {
    list: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_LIST_SUCCESS':
          return Object.assign({}, action, {
            list: [...state.list, action.list],
            isFetching: false
          });
    default:
          return state;
  }
};
