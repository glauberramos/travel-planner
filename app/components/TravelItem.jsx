import React from 'react';
import PropTypes from 'prop-types';

const TravelItem = ({ id, destination, startDate, endDate, comments, deleteTravel }) => {
  const onDelete = () => {
    return function() {
      this.props.deleteTravel(id);
    }
  }

  return (
    <div key={ id }>
      { destination }
      { startDate }
      { endDate }
      { comments }
      <button onClick={ this.onDelete(travel.id).bind(this) }>
        Delete travel
      </button>
    </div>
  );
};

TravelItem.propTypes = {
  id: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.date.isRequired,
  endDate: PropTypes.date.isRequired,
  comments: PropTypes.string.isRequired,
  deleteTravel: PropTypes.func.isRequired
};

export default TravelItem;
