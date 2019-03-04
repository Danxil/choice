const initialState = {
  list: null,
};


const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_CANDIDATES_SUCCESS':
      return { ...state, list: payload };
    default:
      return state;
  }
};

export default reducer;
