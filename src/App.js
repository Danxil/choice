import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router';
import { branch, compose, lifecycle, pure, renderComponent } from 'recompose';

import Providers, { history } from './redux/Providers';

import Content from './components/Content';
import Main from './components/Main';
import Candidate from './components/Candidate';
import withUser from './containers/withUser';
import withBusinessConfig from './containers/withBusinessConfig';
import Spinner from './components/common/Spinner';
import AuthenticatedRoute from './components/common/AuthenticatedRoute';
import NotAuthenticatedRoute from './components/common/NotAuthenticatedRoute';
import AdminStatistic from './components/AdminStatistic';
import Menu from './components/Menu';
import Login from './components/Login';

const AppComp = () => {
  return (
    <Layout className="layout">
      <Menu />
      <Login />
      <Content>
        <Switch>
          <NotAuthenticatedRoute exact path="/:activePage(candidates|about)?/" component={Main} />
          <AuthenticatedRoute path="/admin-statistic/" component={AdminStatistic} />
          <NotAuthenticatedRoute exact path="/candidates/:candidateId([0-9]*)/" component={Candidate} />
        </Switch>
      </Content>
    </Layout>
  );
};

const App = compose(
  withRouter,
  withUser(),
  withBusinessConfig(),
  lifecycle({
    componentDidMount() {
      this.props.getUserInfo();
      this.props.getBusinessConfig();
    }
  }),
  branch(
    ({ userInfoRequestDone, businessConfig }) => !userInfoRequestDone || !businessConfig,
    renderComponent(() => <Spinner overlay={true} transparentOverlay={true} />),
  ),
  pure,
)(AppComp);

AppComp.defaultProps = {
  gameConfig: null,
};

AppComp.propTypes = {
  userInfo: PropTypes.object,
};

export default () => {
  return (
    <Providers>
      <App history={history} />
    </Providers>
  );
};
