import { connect } from 'react-redux';
import {
  getOpinions,
  addOpinion,
  vote,
  unvote,
  verifyOpinion,
  deleteOpinion,
} from '../redux/opinions/actions';

export default () => connect(
  ({ opinions: { list, votingInProcess } }) => {
    return {
      opinions: list,
      votingInProcess,
    };
  }, (dispatch) => ({
    getOpinions({ candidateId, verified }) {
      return dispatch(getOpinions({ candidateId, verified }));
    },
    addOpinion({ candidateId, values, cb }) {
      return dispatch(addOpinion({ candidateId, values, cb }));
    },
    vote({ userId, opinionId }) {
      return dispatch(vote({ userId, opinionId }));
    },
    unvote({ userId, opinionId }) {
      return dispatch(unvote({ userId, opinionId }));
    },
    verifyOpinion({ opinionId }) {
      return dispatch(verifyOpinion({ opinionId }));
    },
    deleteOpinion({ opinionId }) {
      return dispatch(deleteOpinion({ opinionId }));
    },
  }),
);
