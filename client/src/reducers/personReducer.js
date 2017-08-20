const initialState = {
    person: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_PERSON_SUCCESS':
          return action;
    default:
          return state;
  }
};
