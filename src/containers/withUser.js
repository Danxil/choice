import { connect } from 'react-redux';
import {
  getUserInfo,
  logout,
  signIn,
  signUp,
  verifyUser,
  deleteUser,
  getNotVerifiedUsers,
} from '../redux/user/actions';

export default () => connect(
  ({
    user: {
      userInfo,
      userInfoRequestDone,
      users,
    }
  }) => ({
    userInfo,
    userInfoRequestDone,
    users,
  }),
  (dispatch) => {
    return {
      getUserInfo() {
        return dispatch(getUserInfo());
      },
      logout() {
        return dispatch(logout());
      },
      signIn({ values }) {
        return dispatch(signIn({ values }));
      },
      signUp({ values }) {
        return dispatch(signUp({ values }));
      },
      verifyUser({ userId, socialId }) {
        return dispatch(verifyUser({ userId, socialId }));
      },
      deleteUser({ userId }) {
        return dispatch(deleteUser({ userId }));
      },
      getNotVerifiedUsers() {
        return dispatch(getNotVerifiedUsers());
      },
    };
  }
);
