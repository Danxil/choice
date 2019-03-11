import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose, pure, lifecycle, branch, renderNothing } from 'recompose';
import Container from '../common/Container';
import PageTitle from '../common/PageTitle';
import withAdminStatistic from '../../containers/withAdminStatistic';
import withOpinions from '../../containers/withOpinions';
import withUser from '../../containers/withUser';
import StatisticField from './StatisticField';
import Opinions from '../Opinions';
import Users from '../Users';

const AdminStatistic = ({ adminStatistic }) => {
  return (
    <Fragment>
      <Container>
        <PageTitle>Admin statistic</PageTitle>
        <div>
          {
            adminStatistic.fields.map(o => (<StatisticField key={`field-${o.label}`} field={o} />))
          }
        </div>
      </Container>
      <Container>
        <h2>Opinions to be verified</h2>
      </Container>
      <Opinions />
      <Container>
        <h2>Users to be verified</h2>
      </Container>
      <Users />
    </Fragment>
  )
};

export default compose(
  withRouter,
  withAdminStatistic(),
  withUser(),
  withOpinions(),
  lifecycle({
    componentDidMount() {
      this.props.getOpinions({ verified: false });
      this.props.getNotVerifiedUsers();
      this.props.getAdminStatistic();
    }
  }),
  branch(
    ({ adminStatistic }) => adminStatistic === null,
    renderNothing,
  ),
  pure,
)(AdminStatistic);

AdminStatistic.defaultProps = {
  adminStatistic: null,
};

AdminStatistic.propTypes = {
  adminStatistic: PropTypes.object,
  getOpinions: PropTypes.func.isRequired,
  opinions: PropTypes.array.isRequired,
};
