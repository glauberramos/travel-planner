import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TravelBoard from '../components/TravelBoard';
import TravelBox from '../components/TravelBox';
import { createTravel } from '../actions/travels';

class Travel extends Component {
  render() {
    const { travels, createTravel } = this.props;
    return (
      <div>
        <TravelBox createTravel={ createTravel } />
        <TravelBoard travels={ travels } />
      </div>
    );
  }
}

Travel.propTypes = {
  travels: PropTypes.array.isRequired,
  createTravel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    travels: state.travel
  };
}

export default connect(mapStateToProps, { createTravel })(Travel);
