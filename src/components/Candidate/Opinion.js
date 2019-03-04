import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withProps, withHandlers } from 'recompose';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import withOpinions from '../../containers/withOpinions';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import styles from './Opinion.module.scss';

const Opinion = ({
  opinion: {
    user,
    opinionItems,
    overallText,
    votes
  },
  voted,
  voteHandler
}) => {
  return (
    <div className={styles.opinion}>
      <Container>
        <div className={styles.content}>
          <div className={styles.profession}>{user.profession.name}</div>
          <div onClick={voteHandler} className={classNames(styles.like, { [styles.voted]: voted })}>
            <i className={classNames('fa-thumbs-up', { 'far': !voted }, { 'fas': voted })} /> <small className={styles.counter}>{votes.length ? votes.length : ''}</small>
          </div>
          <div className={styles.userMeta}>{user.age} років, <span className={styles.educationName}>{user.education.name}</span> освіта, м. {user.location.name}</div>
          <div className={classNames(styles.prosConsBlock, styles.pros)}>
            {
              opinionItems.filter(i => i.type).map(opinion => (
                <div key={`opinion-${opinion.id}`} className={styles.item}>+ {opinion.text}</div>
              ))
            }
          </div>
          <div className={classNames(styles.prosConsBlock, styles.cons)}>
            {
              opinionItems.filter(i => !i.type).map(opinion => (
                <div key={`opinion-${opinion.id}`} className={styles.item}>- {opinion.text}</div>
              ))
            }
          </div>
          <div className={styles.overall}>
            <div className={styles.overallTitle}>Загальна думка:</div>
            {overallText}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withRouter,
  withUser(),
  withOpinions(),
  withProps(({ opinion: { votes }, userInfo: { id: userId } }) => ({
    voted: !!votes.find(vote => vote.userId === userId)
  })),
  withHandlers({
    voteHandler: ({
      userInfo: {
        id: userId
      },
      opinion: {
        id: opinionId
      },
      match: {
        params: { candidateId },
      },
      vote,
      unvote,
      voted,
      votingInProcess,
    }) => () => {
      if (votingInProcess) return;
      const fn = voted ? unvote : vote;
      fn({ opinionId, userId, candidateId });
    },
  }),
  pure,
)(Opinion);

Opinion.defaultProps = {
};
Opinion.propTypes = {
  opinion: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  unvote: PropTypes.func.isRequired,
  voteHandler: PropTypes.func.isRequired,
  voted: PropTypes.bool.isRequired,
  votingInProcess: PropTypes.bool.isRequired,
};
