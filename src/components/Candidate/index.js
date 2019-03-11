import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, lifecycle, withProps, renderNothing, branch } from 'recompose';
import { Avatar } from 'antd';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import { Button } from 'antd';
import withUser from '../../containers/withUser';
import withCandidates from '../../containers/withCandidates';
import withOpinions from '../../containers/withOpinions';
import Link from '../../components/common/Link';
import PageTitle from '../common/PageTitle';
import Container from '../common/Container';
import styles from './index.module.scss';
import Opinions from '../Opinions';
import AddOpinionModal from '../AddOpinionModal';

const AddBtn = compose(withUser(), pure)(({ userInfo }) => (
  <div className={styles.btn}>
    <Link to={{ pathname: './', search: userInfo ? '?showModal=add-opinion' : '?showModal=sign-up' }}>
      <Button
        size="large"
        type="primary"
        className={classNames('ghostBtn')}
      >
        Додати свою
      </Button>
    </Link>
  </div>
));

const Candidate = ({ candidate, opinions }) => {
  return (
    <div className={styles.candidate}>
      <Container>
        <PageTitle>{candidate.name}</PageTitle>
        <div className={styles.candidateInfo}>
          <Avatar className={styles.avatar} src={candidate.photoUrl} />
          <div className={styles.age}>Вік: {candidate.age}</div>
          <div className={styles.description}>{candidate.description}</div>
        </div>
      </Container>
      <h2 className={styles.title}>Думки людей:</h2>
      <AddBtn />
      <Opinions />
      { opinions.length ? (<AddBtn />) : null }
      <AddOpinionModal />
    </div>
  );
};

export default compose(
  withRouter,
  withOpinions(),
  withCandidates(),
  withOpinions(),
  withProps(({ candidates, match: { params: { candidateId } } }) => ({
    candidate: candidates.find(({ id }) => id === parseInt(candidateId))
  })),
  lifecycle({
    componentDidMount() {
      this.props.setActiveCandidateId(this.props.match.params.candidateId);
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },
    componentDidUnmunt() {
      this.props.setActiveCandidateId(null);
    }
  }),
  branch(
    ({
      candidate,
    }) => !candidate,
    renderNothing,
  ),
  pure,
)(Candidate);

Candidate.defaultProps = {
  userInfo: null,
};
Candidate.propTypes = {
  userInfo: PropTypes.object,
  candidate: PropTypes.object.isRequired,
  opinions: PropTypes.array.isRequired,
};
