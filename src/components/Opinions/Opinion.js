import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure, withProps, withHandlers } from 'recompose';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import { Tooltip } from 'antd';
import withOpinions from '../../containers/withOpinions';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import VerifyBtns from '../common/VerifyBtns';
import styles from './Opinion.module.scss';

const Opinion = ({
  opinion: {
    user,
    opinionItems,
    overallText,
    votes,
    verified,
  },
  userInfo,
  voted,
  voteHandler,
  verifyOpinion,
  deleteOpinion,
}) => {
  return (
    <div className={styles.opinion}>
      <Container>
        <div className={styles.content}>
          <div className={styles.profession}>{user.profession.name}</div>
          {
            !verified ? (
              <div className={styles.notVerified}>
                <Tooltip placement="bottom" title="Модератор перевірить ваш пост у найближчий час">
                  Очікує на верифікацію  <i className="fas fa-question-circle" />
                </Tooltip>
                {
                  userInfo && userInfo.isAdmin && (<VerifyBtns verify={verifyOpinion} delete={deleteOpinion} />)
                }
              </div>
            ) : (
              <div onClick={voteHandler} className={classNames(styles.like, { [styles.voted]: voted })}>
                <i className={classNames('fa-thumbs-up', { 'far': !voted }, { 'fas': voted })} /> <small className={styles.counter}>{votes.length ? votes.length : ''}</small>
              </div>
            )
          }
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
  withProps(({ opinion: { votes }, userInfo }) => ({
    voted: !!userInfo && !!votes.find(vote => vote.userId === userInfo.id)
  })),
  withHandlers({
    voteHandler: ({
      history,
      userInfo,
      opinion: {
        id: opinionId
      },
      vote,
      unvote,
      voted,
      votingInProcess,
    }) => () => {
      if (votingInProcess) return;
      if (!userInfo) return history.push('./?showModal=sign-up');
      const fn = voted ? unvote : vote;
      fn({ opinionId, userId: userInfo.id });
    },
    verifyOpinion: ({ verifyOpinion, opinion: { id: opinionId }}) => () => {
      verifyOpinion({ opinionId })
    },
    deleteOpinion: ({ deleteOpinion, opinion: { id: opinionId }}) => () => {
      deleteOpinion({ opinionId })
    }
  }),
  pure,
)(Opinion);

Opinion.defaultProps = {
  userInfo: null,
};
Opinion.propTypes = {
  userInfo: PropTypes.object,
  opinion: PropTypes.object.isRequired,
  vote: PropTypes.func.isRequired,
  unvote: PropTypes.func.isRequired,
  voteHandler: PropTypes.func.isRequired,
  voted: PropTypes.bool.isRequired,
  votingInProcess: PropTypes.bool.isRequired,
  verifyOpinion: PropTypes.func.isRequired,
  deleteOpinion: PropTypes.func.isRequired,
};
