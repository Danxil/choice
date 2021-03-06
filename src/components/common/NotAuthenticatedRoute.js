import React from 'react'
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router'
import withUser from '../../containers/withUser';
import { compose, pure, branch, renderNothing } from 'recompose';

const PrivateRoute = ({ component: Component, userInfo, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !userInfo ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/cabinet/', search: props.search || location.search }} />
        )
      }
    />
  )
}

PrivateRoute.defaultProps = {
  userInfo: null,
};

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
}

export default compose(
  withRouter,
  withUser(),
  branch(
    ({
      userInfoRequestDone,
    }) => !userInfoRequestDone,
    renderNothing,
  ),
  pure
)(PrivateRoute);
