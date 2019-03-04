import { connect } from 'react-redux';
import {
  getOpinions,
  addOpinion,
  vote,
  unvote,
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
    addOpinion({ candidateId, values, cb }) {
      return dispatch(addOpinion({ candidateId, values, cb }));
    },
    vote({ userId, opinionId, candidateId }) {
      return dispatch(vote({ userId, opinionId, candidateId }));
    },
    unvote({ userId, opinionId, candidateId }) {
      return dispatch(unvote({ userId, opinionId, candidateId }));
    }
  }),
);
