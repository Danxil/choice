import React, { Fragment } from 'react';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
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
  pure,
)(Login);

Login.defaultProps = {
};

Login.propTypes = {
};
