import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import { compose, pure } from 'recompose';
import classNames from 'classnames';
import { Icon } from 'antd';
import styles from './Top.module.scss';
import Link from '../common/Link';

const Top = ({ match: { params: { activePage } } }) => {
  return (
    <div className={styles.top}>
      <Container>
        <div className={classNames(styles.slogan, styles.slogan1)}>
          <span>Вибори<br/>президента 2019</span>
        </div>
        <div className={classNames(styles.slogan, styles.slogan2)}>
          <span>Обгрунтуй свою позицію<br/>анонімно</span>
        </div>
        <div className={classNames('downLink', { [styles.hidden]: activePage === 'candidates' })}>
          <Link to={{ pathname: '/candidates/' }}>
            <Icon type="down-circle" />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withRouter,
  withUser(),
  pure,
)(Top);

Top.defaultProps = {
  userInfo: null,
};
Top.propTypes = {
  userInfo: PropTypes.object,
  match: PropTypes.object.isRequired,
};
