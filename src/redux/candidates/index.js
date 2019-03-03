const initialState = {
  candidates: [],
  candidateInfo: null,
};


const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'GET_CANDIDATES_SUCCESS':
      return { ...state, candidates: payload };
    case 'GET_CANDIDATE_INFO_SUCCESS':
      return { ...state, candidateInfo: payload };
    default:
      return state;
  }
};

export default reducer;
