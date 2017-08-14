const initialState = {
    videos: [],
    isFetching: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_VIDEOS_SUCCESS':
          return action;
    default:
          return state;
  }
};
