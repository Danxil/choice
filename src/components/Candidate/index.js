import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, lifecycle } from 'recompose';
import { Avatar } from 'antd';
import withUser from '../../containers/withUser';
import withCandidates from '../../containers/withCandidates';
import withOpinions from '../../containers/withOpinions';
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';
import styles from './index.module.scss';
import Opinions from './Opinions';

const Candidate = () => {
  return (
    <div className={styles.candidate}>
      <Container>
        <PageTitle>Вася Васин</PageTitle>
        <div className={styles.candidateInfo}>
          <Avatar size={200} />
          <div className={styles.age}>Вік: 77</div>
          <div className={styles.description}>Олигарх, бизнесмен, политик</div>
        </div>
      </Container>
      <Opinions />
    </div>
  );
};

export default compose(
  withUser(),
  withCandidates(),
  withOpinions(),
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
};
