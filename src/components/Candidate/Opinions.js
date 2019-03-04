import React from 'react';
import PropTypes from 'prop-types';
import { lifecycle, compose, pure } from 'recompose';
import classNames from 'classnames';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import withOpinions from '../../containers/withOpinions';
import Link from '../../components/common/Link';
import styles from './Opinions.module.scss';
import Opinion from './Opinion';

const Opinions = ({ userInfo, opinions }) => {
  return (
    <div className={styles.opinions}>
      <h2 className={styles.title}>Думки людей:</h2>
      <Link to={{ pathname: './', search: userInfo ? '?showModal=add-opinion' : '?showModal=sign-up' }}>
        <Button
          size="large"
          type="primary"
          className={classNames('ghostBtn', styles.btn)}
        >
          Додати свою
        </Button>
      </Link>
      <div className={styles.list}>
        {
          opinions.map((opinion, index) => (
            <Opinion key={index} opinion={opinion} />
          ))
        }
      </div>
      <Link to={{ pathname: './', search: userInfo ? '?showModal=add-opinion' : '?showModal=sign-up' }}>
        <Button
          size="large"
          type="primary"
          className={classNames('ghostBtn', styles.btn)}
        >
          Додати свою
        </Button>
      </Link>
    </div>
  );
};

export default compose(
  withRouter,
  withUser(),
  withOpinions(),
  lifecycle({
    componentDidMount() {
      this.props.getOpinions({ candidateId: this.props.match.params.candidateId });
    },
  }),
  pure,
)(Opinions);

Opinions.defaultProps = {
  userInfo: null,
};
Opinions.propTypes = {
  userInfo: PropTypes.object,
  opinions: PropTypes.array.isRequired,
};
