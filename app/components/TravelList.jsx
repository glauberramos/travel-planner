import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TravelItem from '../components/TravelItem';

export default class TravelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destinationFilter: ''
    };
  }

  updateFilter(event) {
    this.setState({
      destinationFilter: event.target.value
    })
  }

  render() {
    const travelListItems = this.props.travels.filter(travel => {
      return travel.destination && travel.destination.includes(this.state.destinationFilter);
      }).map((travel, key) => {
        return (
          <TravelItem
            id={ travel.id }
            key={ travel.id }
            destination={ travel.destination }
            startDate={ travel.startDate }
            endDate={ travel.endDate }
            comments={ travel.comments }
            deleteTravel={ this.props.deleteTravel }
            updateTravel= { this.props.updateTravel } />
        );
      });

    return (
      <div>
        <input value={ this.state.destinationFilter } placeholder="Filter destination" onChange={ this.updateFilter.bind(this) } />
        { travelListItems }
      </div>
    )
  }
};

TravelList.propTypes = {
  travels: PropTypes.array.isRequired,
  deleteTravel: PropTypes.func.isRequired,
  updateTravel: PropTypes.func.isRequired
};
