import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import styles from './index.module.scss';
import Link from '../common/Link';

const MENU_ITEMS = [
  {
    label: 'Головна',
    path: '/',
  },
  {
    label: 'Кандидати',
    path: '/candidates/',
  },
  {
    label: 'Реестрація',
    path: './',
    search: '?showModal=sign-up'
  },

]

const Menu = () => (
  <div className={styles.menu}>
    {
      MENU_ITEMS.map((item, index) => (
        <div key={index} className={styles.item}><Link to={{ pathname: item.path, search: item.search }}>{item.label}</Link></div>
      ))
    }

  </div>
);

export default compose(
  pure,
)(Menu);

Menu.defaultProps = {
  className: '',
};
Menu.propTypes = {
  className: PropTypes.string,
};
