import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TravelBoard from '../components/TravelBoard';
import TravelBox from '../components/TravelBox';
import { createTravel, deleteTravel } from '../actions/travels';

class Travel extends Component {
  render() {
    const { travels, createTravel, deleteTravel } = this.props;
    return (
      <div>
        <TravelBox createTravel={ createTravel } />
        <TravelBoard travels={ travels } deleteTravel={ deleteTravel } />
      </div>
    );
  }
}

Travel.propTypes = {
  travels: PropTypes.array.isRequired,
  createTravel: PropTypes.func.isRequired,
  deleteTravel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    travels: state.travel
  };
}

export default connect(mapStateToProps, { createTravel, deleteTravel })(Travel);
