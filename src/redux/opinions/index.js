const initState = { list: [], votingInProcess: false, };
const reducer = (state = initState, { type, payload }) => {
  switch (type) {
    case 'VOTE_REQUEST':
    case 'UNVOTE_REQUEST':
      return { ...state, votingInProcess: true };
    case 'GET_OPINIONS_SUCCESS':
      return { ...state, list: payload, votingInProcess: false };
    case 'VOTE_SUCCESS':
      return {
        ...state,
        list: state.list.map(opinion => {
          if (opinion.id === payload.opinionId) {
            opinion.votes.push({
              opinionId:  payload.opinionId,
              userId:  payload.userId,
            });
          }
          return opinion;
        }),
        votingInProcess: false
      };
    case 'UNVOTE_SUCCESS':
      return {
        ...state,
        list: state.list.map(opinion => {
          if (opinion.id === payload.opinionId) {
            opinion.votes = opinion.votes.filter(vote => vote.userId !== payload.userId);
          }
          return opinion;
        }),
        votingInProcess: false
      };
    default:
      return state;
  }
};

export default reducer;
