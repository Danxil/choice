import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import withCandidates from '../../containers/withCandidates';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import PersonItem from '../common/PersonItem';
import PageTitle from '../common/PageTitle';
import Link from '../common/Link';
import { compose, pure } from 'recompose';
import styles from './Сandidates.module.scss';

const Сandidates = ({ candidates }) => {
  return (
    <div className={styles.candidates} id="candidates">
      <Container>
        <PageTitle>Кандидати</PageTitle>
        <div className={styles.list}>
          {
            candidates.map((candidate, index) => (
              <Link
                key={index}
                className={styles.item}
                to={{ pathname: `/candidates/${candidate.id}/` }}
              >
                <PersonItem
                  id={candidate.id}
                  name={candidate.name}
                  imageLink="http://google.com"
                  age={candidate.age}
                  description={candidate.description}
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
  withRouter,
  withUser(),
  withCandidates(),
  pure,
)(Сandidates);

Сandidates.defaultProps = {
  userInfo: null,
};
Сandidates.propTypes = {
  userInfo: PropTypes.object,
  candidates: PropTypes.array.isRequired,
};
