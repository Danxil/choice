import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import withOpinions from '../../containers/withOpinions';
import styles from './index.module.scss';
import Opinion from './Opinion';

const Opinions = ({ opinions }) => {
  return (
    <div className={styles.opinions}>
      <div className={styles.list}>
        {
          opinions.map((opinion, index) => (
            <Opinion key={index} opinion={opinion} />
          ))
        }
      </div>

    </div>
  );
};

export default compose(
  withRouter,
  withUser(),
  withOpinions(),
  pure,
)(Opinions);

Opinions.defaultProps = {
  userInfo: null,
};
Opinions.propTypes = {
  userInfo: PropTypes.object,
  opinions: PropTypes.array.isRequired,
};
