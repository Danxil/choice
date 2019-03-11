import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose, pure } from 'recompose';
import { Button } from 'antd';
import { withRouter } from 'react-router';
import styles from './index.module.scss';

const VerifyBtns = ({
  verify: verifyFn,
  delete: deleteFn,
  className,
}) => {
  return (
    <div className={classNames(styles.verifyBtns, className)}>
      <Button
        size="large"
        type="primary"
        className={styles.verifyBtn}
        onClick={verifyFn}
      >
        Verify
      </Button>
      <Button
        size="large"
        type="danger"
        className={styles.verifyBtn}
        onClick={deleteFn}
      >
        Delete
      </Button>
    </div>
  );
};

export default compose(
  withRouter,
  pure,
)(VerifyBtns);

VerifyBtns.defaultProps = {
  className: '',
};
VerifyBtns.propTypes = {
  verify: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  className: PropTypes.string,
};
