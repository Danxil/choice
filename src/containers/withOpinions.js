import { connect } from 'react-redux';
import {
  getOpinions,
  getNotVerifiedOpinions,
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
    getOpinions({ candidateId }) {
      return dispatch(getOpinions({ candidateId }));
    },
    getNotVerifiedOpinions() {
      return dispatch(getNotVerifiedOpinions());
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
