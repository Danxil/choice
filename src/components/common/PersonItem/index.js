import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import { Avatar } from 'antd';
import styles from './index.module.scss';

const PersonItem = ({ imageLink, name, age, description }) => (
  <div className={styles.personItem}>
    <Avatar size={200} icon={imageLink} />
    <div className={styles.textBlock}>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.age}>Вік: {age}</p>
      <p className={styles.description}>{description}</p>
    </div>
  </div>
);

export default compose(
  pure,
)(PersonItem);

PersonItem.defaultProps = {
};
PersonItem.propTypes = {
  name: PropTypes.string.isRequired,
  imageLink: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};
