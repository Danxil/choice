import React, { Fragment } from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { compose, pure } from 'recompose';
import styles from './index.module.scss';
import Link from '../common/Link';
import withUser from '../../containers/withUser';

const MENU_ITEMS = [
  {
    label: 'Кандидати',
    path: '/candidates/',
  },
];

const Menu = ({ userInfo, logout }) => (
  <div className={styles.menu}>
    {
      MENU_ITEMS.map((item, index) => (
        <div key={index} className={styles.item}><Link to={{ pathname: item.path, search: item.search }}>{item.label}</Link></div>
      ))
    }
    {
      !userInfo && <div className={styles.item}><Link to={{ pathname: './', search: '?showModal=sign-up' }}>Реестрація</Link></div>
    }
    {
      userInfo && (
        <Fragment>
          <div className={styles.item}><a onClick={logout}>Вийти</a></div>
          <div className={styles.userInfo}>
            {userInfo.email} | {
              !userInfo.verified ? (
                <span className={styles.notVerified}>
                  <Tooltip placement="bottom" title="Модератор перевірить ваш профіль у найближчий час">
                    Ще веріфікований  <i className="fas fa-question-circle" />
                  </Tooltip>
                </span>
              ) : (
                <span className={styles.verified}>Веріфікований</span>
              )
            }
          </div>
        </Fragment>
      )
    }
  </div>
);

export default compose(
  withRouter,
  withUser(),
  pure,
)(Menu);
Menu.defaultProps = {
  userInfo: null,
};
Menu.propTypes = {
  userInfo: PropTypes.object,
  logout: PropTypes.func.isRequired,
};
