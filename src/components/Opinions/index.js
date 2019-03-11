import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import $ from 'jquery';
import { compose, pure, withState, withProps, withHandlers } from 'recompose';
import classNames from 'classnames';
import { withRouter } from 'react-router';
import withUser from '../../containers/withUser';
import Container from '../common/Container';
import withOpinions from '../../containers/withOpinions';
import styles from './index.module.scss';
import Opinion from './Opinion';
import FilterCandidatesForm from './FilterCandidatesForm';
import { Popover } from 'antd';


const Opinions = ({
  opinions,
  professions,
  education,
  locations,
  showFilterPopover,
  setShowFilterPopover,
  filterOpinions,
  onApplyFilters,
}) => {
  return (
    <div className={styles.opinions}>
      <Container>
        <div className={styles.content}>
          <Popover
            content={
              <FilterCandidatesForm
                professions={professions}
                education={education}
                locations={locations}
                onApply={onApplyFilters}
              />
            }
            title="Фільтрувати думки"
            trigger="click"
            visible={showFilterPopover}
            onVisibleChange={setShowFilterPopover}
          >
            <i className={classNames('fas fa-filter', styles.filterBtn)}></i>
          </Popover>
        </div>
      </Container>
      <div className={styles.list} id="candidatesList">
        {
          filterOpinions(opinions).map((opinion, index) => (
            <Opinion key={`opinion-${index}`} opinion={opinion} />
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
  withState('filter', 'setFilter', {
    professionId: null,
    educationId: null,
    locationId: null,
    age: null,
  }),
  withState('showFilterPopover', 'setShowFilterPopover', false),
  withProps(({ opinions }) => ({
    professions: _.uniqBy(opinions, 'user.professionId').map(i => i.user.profession),
    education: _.uniqBy(opinions, 'user.educationId').map(i => i.user.education),
    locations: _.uniqBy(opinions, 'user.locationId').map(i => i.user.location),
  })),
  withHandlers({
    filterOpinions: ({
      filter,
    }) => (opinions) => {
      return opinions.filter(i => {
        return (filter.professionId === null || i.user.professionId === filter.professionId) &&
          (filter.locationId === null || i.user.locationId === filter.locationId) &&
          (filter.educationId === null || i.user.educationId === filter.educationId) &&
          (!filter.age || (i.user.age >= filter.age[0] && i.user.age <= filter.age[1]))
      })
    },
    onApplyFilters: ({ setFilter, setShowFilterPopover }) => (values) => {
      setFilter(values);
      setShowFilterPopover(false);
      $('html, body').animate({
        scrollTop: $('#candidatesList').offset().top - 80,
      }, 1000);
    }
  }),
  pure,
)(Opinions);

Opinions.defaultProps = {
};
Opinions.propTypes = {
  opinions: PropTypes.array.isRequired,
  showFilterPopover: PropTypes.bool.isRequired,
  setShowFilterPopover: PropTypes.func.isRequired,
  professions: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired,
  locations: PropTypes.array.isRequired,
  setFilter: PropTypes.func.isRequired,
  filterOpinions: PropTypes.func.isRequired,
  onApplyFilters: PropTypes.func.isRequired,
};
