import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, lifecycle, withProps } from 'recompose';
import { Avatar } from 'antd';
import withUser from '../../containers/withUser';
import withCandidates from '../../containers/withCandidates';
import withOpinions from '../../containers/withOpinions';
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';
import styles from './index.module.scss';
import Opinions from './Opinions';
import AddOpinionModal from '../AddOpinionModal';

const Candidate = ({ candidate }) => {
  return (
    <div className={styles.candidate}>
      <Container>
        <PageTitle>{candidate.name}</PageTitle>
        <div className={styles.candidateInfo}>
          <Avatar size={200} />
          <div className={styles.age}>Вік: {candidate.age}</div>
          <div className={styles.description}>{candidate.description}</div>
        </div>
      </Container>
      <Opinions />
      <AddOpinionModal />
    </div>
  );
};

export default compose(
  withUser(),
  withCandidates(),
  withOpinions(),
  withProps(({ candidates, match: { params: { candidateId } } }) => ({
    candidate: candidates.find(({ id }) => id === parseInt(candidateId))
  })),
  lifecycle({
    componentDidMount() {
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }),
  pure,
)(Candidate);

Candidate.defaultProps = {
  userInfo: null,
};
Candidate.propTypes = {
  userInfo: PropTypes.object,
  candidate: PropTypes.object.isRequired,
};
