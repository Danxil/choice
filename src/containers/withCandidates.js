import { connect } from 'react-redux';
import {
  getCandidates,
  setActiveCandidateId,
} from '../redux/candidates/actions';

export default () => connect(
  ({ candidates: { list, activeCandidateId } }) => {
    return {
      candidates: list,
      activeCandidateId,
    };
  }, (dispatch) => ({
    getCandidates() {
      return dispatch(getCandidates());
    },
    setActiveCandidateId(candidateId) {
      return dispatch(setActiveCandidateId(candidateId));
    },
  }),
);
