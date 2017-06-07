import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TravelBoard extends Component {
  onDelete(id) {
    return function() {
      this.props.deleteTravel(id)
    }
  }

  render() {
    const travelListItems = this.props.travels.map((travel, key) => {
      return (
        <div key={ travel.id }>
          { travel.destination }
          { travel.startDate }
          { travel.endDate }
          { travel.comments }
          <button onClick={ this.onDelete(travel.id).bind(this) }>
            Delete travel
          </button>
        </div>
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
  deleteTravel: PropTypes.func.isRequired
};
