const initialState = {
  data: null,
};


const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_META_SUCCESS':
      return { ...state, data: payload };
    default:
      return state;
  }
};

export default reducer;
