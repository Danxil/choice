import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { Switch, withRouter, Route } from 'react-router';
import { branch, compose, lifecycle, pure, renderComponent } from 'recompose';

import Providers, { history } from './redux/Providers';

import Content from './components/Content';
import Main from './components/Main';
import Candidate from './components/Candidate';
import withUser from './containers/withUser';
import withBusinessConfig from './containers/withBusinessConfig';
import withCandidates from './containers/withCandidates';
import Spinner from './components/common/Spinner';
import AuthenticatedRoute from './components/common/AuthenticatedRoute';
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
          <Route exact path="/:activePage(candidates|about)?/" component={Main} />
          <Route exact path="/candidates/:candidateId([0-9]*)/" component={Candidate} />
          <AuthenticatedRoute path="/admin-statistic/" component={AdminStatistic} />
        </Switch>
      </Content>
    </Layout>
  );
};

const App = compose(
  withRouter,
  withUser(),
  withBusinessConfig(),
  withCandidates(),
  lifecycle({
    componentDidMount() {
      this.props.getUserInfo();
      this.props.getBusinessConfig();
      this.props.getCandidates();
    }
  }),
  branch(
    ({ userInfoRequestDone, businessConfig, candidates }) => !userInfoRequestDone || !businessConfig || !candidates,
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
