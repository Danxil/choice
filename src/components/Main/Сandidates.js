import React from 'react';
import PropTypes from 'prop-types';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import PersonItem from '../common/PersonItem';
import PageTitle from '../common/PageTitle';
import Link from '../common/Link';
import { compose, pure } from 'recompose';
import styles from './Сandidates.module.scss';

const Сandidates = () => {
  return (
    <div className={styles.candidates} id="candidates">
      <Container>
        <PageTitle>Кандидати</PageTitle>
        <div className={styles.list}>
          {
            [1, 1, 1, 1, 1].map((candidate, index) => (
              <Link
                key={index}
                className={styles.item}
                to={{ pathname: `/candidates/${candidate.id}/` }}
              >
                <PersonItem
                  name="Петр Порошенко"
                  imageLink="http://google.com"
                  age={77}
                  description="Олигарх, бизнесмен, политик"
                />
              </Link>
            ))
          }
        </div>
      </Container>
    </div>
  );
};

export default compose(
  withUser(),
  pure,
)(Сandidates);

Сandidates.defaultProps = {
  userInfo: null,
};
Сandidates.propTypes = {
  userInfo: PropTypes.object,
};
