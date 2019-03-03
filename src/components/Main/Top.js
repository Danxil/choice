import React from 'react';
import PropTypes from 'prop-types';
import { withLocalize } from 'react-localize-redux';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import { compose, pure } from 'recompose';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './Top.module.scss';
import Link from '../common/Link';

const Top = () => {
  return (
    <div className={styles.top}>
      <Container>
        <div className={classNames(styles.slogan, styles.slogan1)}>
          <span>Вибори<br/>президента 2019</span>
        </div>
        <div className={classNames(styles.slogan, styles.slogan2)}>
          <span>Обгрунтуй свою позицію</span>
        </div>
        <div className={styles.downLink}>
          <Link to={{ pathname: '/candidates' }}>
            <Icon type="down-circle" />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withLocalize,
  withUser(),
  pure,
)(Top);

Top.defaultProps = {
  userInfo: null,
};
Top.propTypes = {
  translate: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
};
