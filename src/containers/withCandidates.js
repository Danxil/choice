import { connect } from 'react-redux';
import {
  getCandidates,
} from '../redux/candidates/actions';

export default () => connect(
  ({ candidates: { list } }) => {
    return {
      candidates: list,
    };
  }, (dispatch) => ({
    getCandidates() {
      return dispatch(getCandidates());
    }
  }),
);
