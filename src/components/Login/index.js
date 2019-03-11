import React, { Fragment } from 'react';
import { compose, pure, lifecycle, branch, renderNothing } from 'recompose';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import withBusinessConfig from '../../containers/withBusinessConfig';
import withMeta from '../../containers/withMeta';
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
  withBusinessConfig(),
  withMeta(),
  lifecycle({
    componentDidUpdate() {
      const { history, userInfo } = this.props;
      const showModal = new URLSearchParams(location.search).get('showModal');
      if (userInfo && (showModal === 'sign-up' || showModal === 'sign-in')) {
        console.log(1);
        history.push('./?');
      }
    },
  }),
  branch(
    ({
      businessConfig,
      meta,
    }) => !businessConfig || !meta,
    renderNothing,
  ),
  pure,
)(Login);

Login.defaultProps = {
};

Login.propTypes = {
};
