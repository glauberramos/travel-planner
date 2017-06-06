import React from 'react';
import PropTypes from 'prop-types';

const TravelBoard = ({travels}) => {
  const travelListItems = travels.map((travel, key) => {
    return (
      <div key={travel.id}>
        { travel.comments }
      </div>
    );
  });
  return (
    <div>
      { travelListItems }
    </div>
  );
};

TravelBoard.propTypes = {
  travels: PropTypes.array.isRequired
};

export default TravelBoard;
