import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TravelCreation from '../components/TravelCreation';
import TravelBoard from '../components/TravelBoard';
import { createTravel, deleteTravel, updateTravel } from '../actions/travels';

class Travel extends Component {
  render() {
    const { travels, createTravel, deleteTravel, updateTravel } = this.props;
    return (
      <div>
        <TravelCreation createTravel={ createTravel } />
        <TravelBoard travels={ travels }
          deleteTravel={ deleteTravel }
          updateTravel={ updateTravel } />
      </div>
    );
  }
}

Travel.propTypes = {
  travels: PropTypes.array.isRequired,
  createTravel: PropTypes.func.isRequired,
  deleteTravel: PropTypes.func.isRequired,
  updateTravel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    travels: state.travel
  };
}

export default connect(mapStateToProps, { createTravel, deleteTravel, updateTravel })(Travel);
