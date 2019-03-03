const initState = { list: [] };
const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case 'GET_OPINIONS_SUCCESS':
      return { list: payload };
    default:
      return state;
  }
};

export default reducer;
