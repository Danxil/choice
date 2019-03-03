import { connect } from 'react-redux';
import {
  getOpinions,
} from '../redux/opinions/actions';

export default () => connect(
  ({ opinions: { list } }) => {
    return {
      opinions: list,
    };
  }, (dispatch) => ({
    getOpinions({ candidateId }) {
      return dispatch(getOpinions({ candidateId }));
    }
  }),
);
