import React from 'react';
import PropTypes from 'prop-types';

const TravelItem = ({ id, destination, startDate, endDate, comments, deleteTravel }) => {
  const onDelete = () => {
    return function() {
      deleteTravel(id);
    }
  }

  return (
    <div>
      { destination }
      { startDate }
      { endDate }
      { comments }
      <button onClick={ onDelete() }>
        Delete travel
      </button>
    </div>
  );
};

TravelItem.propTypes = {
  id: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  deleteTravel: PropTypes.func.isRequired
};

export default TravelItem;
