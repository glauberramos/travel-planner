import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TravelItem from './TravelItem';
import classNames from 'classnames/bind';
import styles from './Travel.css';
const cx = classNames.bind(styles);

export default class TravelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTrip: ''
    };
  }

  updateFilter(event) {
    this.setState({ filterTrip: event.target.value });
  }

  render() {
    const sortArray = (a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    };

    const filteredList = this.props.travels.filter(travel => {
      if (travel.destination !== undefined && travel.comments !== undefined) {
        return travel.destination.toLowerCase().includes(this.state.filterTrip.toLowerCase()) ||
          travel.comments.toLowerCase().includes(this.state.filterTrip.toLowerCase());
      }
    });

    const travelListItems = filteredList.sort(sortArray).map((travel, key) => {
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
        <input className={cx('filter')} value={ this.state.filterTrip } placeholder="Filter your trips by destination or comments" onChange={ this.updateFilter.bind(this) } />
        <br/>
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
