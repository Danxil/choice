import React, { Fragment } from 'react';
import { compose, pure, lifecycle } from 'recompose';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import SignUp from './SignUp';
import SignIn from './SignIn';

const Login = () => {
  return (
    <Fragment>
      <SignUp />
      <SignIn />
    </Fragment>
  );
};

export default compose(
  withRouter,
  withUser(),
  lifecycle({
    componentDidUpdate() {
      const { history, userInfo } = this.props;
      const showModal = new URLSearchParams(location.search).get('showModal');
      if (userInfo && (showModal === 'sign-up' || showModal === 'sign-in')) {
        history.push('./?');
      }
    },
  }),
  pure,
)(Login);

Login.defaultProps = {
};

Login.propTypes = {
};
