const initState = { list: [], votingInProcess: false, };
const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case 'VOTE_REQUEST':
    case 'UNVOTE_REQUEST':
      return { ...state, votingInProcess: true };
    case 'GET_OPINIONS_SUCCESS':
      return { ...state, list: payload, votingInProcess: false };
    default:
      return state;
  }
};

export default reducer;
