import { connect } from 'react-redux';
import {
  getMeta,
} from '../redux/meta/actions';

export default () => connect(
  ({ meta: { data: meta } }) => {
    return { meta };
  }, (dispatch) => ({
    getMeta(val) {
      return dispatch(getMeta(val));
    }
  }),
);
