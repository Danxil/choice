import React from 'react';
import PropTypes from 'prop-types';
import { compose, pure } from 'recompose';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import styles from './Opinion.module.scss';

const Opinion = () => {
  return (
    <div className={styles.opinion}>
      <Container>
        <div className={styles.content}>
          <div className={styles.profession}>Программист</div>
          <div className={styles.like}>
            <i className={classNames('fa-thumbs-up', 'far')} /> <small className={styles.counter}>3423</small>
          </div>
          <div className={styles.userMeta}>27 років, вища освіта, м. Киев</div>
          <div className={classNames(styles.prosConsBlock, styles.pros)}>
            <div className={styles.item}>+ Плюс кандидата номер, одни кандидата номер, одни</div>
            <div className={styles.item}>+ Плюс кандидата номер, одни кандидата номер, одни, кандидата номер, одни</div>
            <div className={styles.item}>+ Плюс кандидата номер, одни кандидата номер</div>
          </div>
          <div className={classNames(styles.prosConsBlock, styles.cons)}>
            <div className={styles.item}>- Плюс кандидата номер, одни кандидата номер, одни</div>
            <div className={styles.item}>- Плюс кандидата номер, одни кандидата номер, одни, кандидата номер, одни</div>
          </div>
          <div className={styles.overall}>
            <div className={styles.overallTitle}>Загальна думка:</div>
            Общее впечатление о кандидате общее, впечатление о кандидате. Общее впечатление о кандидате общее, впечатление о кандидате. Общее впечатление о кандидате общее, впечатление о кандидате
          </div>
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withRouter,
  withUser(),
  pure,
)(Opinion);

Opinion.defaultProps = {
  userInfo: null,
};
Opinion.propTypes = {
  userInfo: PropTypes.object,
};
