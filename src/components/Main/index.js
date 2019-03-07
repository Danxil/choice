import React from 'react';
import { withRouter } from 'react-router';
import { compose, pure, lifecycle } from 'recompose';
import $ from 'jquery';
import Top from './Top';
import Сandidates from './Сandidates';

const Main = () => {
  return (
    <div>
      <Top />
      <Сandidates />
    </div>
  );
}

export default compose(
  withRouter,
  lifecycle({
    componentDidMount() {
      const { match: { params: { activePage } } } = this.props;
      if (activePage) {
        $('html, body').animate({
          scrollTop: $(`#${activePage}`).offset().top - 80,
        }, 1000);
      }
    },
    componentDidUpdate() {
      const { match: { params: { activePage } } } = this.props;
      if (activePage) {
        $('html, body').animate({
          scrollTop: $(`#${activePage}`).offset().top - 80,
        }, 1000);
      }
    }
  }),
  pure,
)(Main);
