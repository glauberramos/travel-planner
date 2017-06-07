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
  startDate: Proptypes.date.isRequired,
  endDate: Proptypes.date.isRequired,
  comments: Proptypes.string.isRequired,
  deleteTravel: PropTypes.func.isRequired
};

export default TravelItem;
