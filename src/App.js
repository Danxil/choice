import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import { Switch, withRouter, Route } from 'react-router';
import { compose, lifecycle, pure } from 'recompose';

import Providers, { history } from './redux/Providers';

import Content from './components/Content';
import Main from './components/Main';
import Candidate from './components/Candidate';
import withUser from './containers/withUser';
import withCandidates from './containers/withCandidates';
import withBusinessConfig from './containers/withBusinessConfig';
import withMeta from './containers/withMeta';
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
  withMeta(),
  withBusinessConfig(),
  withCandidates(),
  lifecycle({
    componentDidMount() {
      this.props.getUserInfo();
      this.props.getCandidates();
      this.props.getBusinessConfig();
      this.props.getMeta();
    }
  }),
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
