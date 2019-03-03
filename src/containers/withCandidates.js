import { connect } from 'react-redux';
import {
  getCandidateInfo,
} from '../redux/candidates/actions';

export default () => connect(
  ({ candidate }) => {
    return {
      candidate,
    };
  }, (dispatch) => ({
    getCandidateInfo({ id }) {
      return dispatch(getCandidateInfo({ id }));
    }
  }),
);
