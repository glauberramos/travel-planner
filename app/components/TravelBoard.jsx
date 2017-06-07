import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TravelItem from '../components/TravelItem';

export default class TravelBoard extends Component {
  render() {
    const travelListItems = this.props.travels.map((travel, key) => {
      return (
        <TravelItem
          id={ travel.id }
          key={ travel.id }
          destination={ travel.destination }
          startDate={ travel.startDate }
          endDate={ travel.endDate }
          comments={ travel.comments }
          deleteTravel={ this.props.deleteTravel }
          updateTravel= { this.props.updateTravel }
          />
      );
    });

    return (
      <div>
        { travelListItems }
      </div>
    )
  }
};

TravelBoard.propTypes = {
  travels: PropTypes.array.isRequired,
  deleteTravel: PropTypes.func.isRequired,
  updateTravel: PropTypes.func.isRequired
};
