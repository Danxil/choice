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
      this.props.getNotVerifiedOpinions();
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
  getNotVerifiedOpinions: PropTypes.func.isRequired,
  opinions: PropTypes.array.isRequired,
};
