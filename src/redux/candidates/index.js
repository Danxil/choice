const initialState = {
  list: null,
  activeCandidateId: null,
};


const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_CANDIDATES_SUCCESS':
      return { ...state, list: payload };
    case 'SET_ACTIVE_CANDIDATE_ID':
      return { ...state, activeCandidateId: payload };
    default:
      return state;
  }
};

export default reducer;
