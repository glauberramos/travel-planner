/* eslint react/prefer-stateless-function: 0, react/forbid-prop-types: 0, react/jsx-no-bind: 0*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import TravelItem from './TravelItem';
import styles from '../travel/travel.css';
import { checkIfNextMonth } from '../../utils/dateFormat';

const cx = classNames.bind(styles);

class TravelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterTrip: '',
      isPrinting: false
    };
  }

  onPrint() {
    this.setState({
      isPrinting: true
    }, () => {
      window.print();
    });

    const that = this;

    setTimeout(() => {
      that.setState({
        isPrinting: false
      });
    }, 100);
  }

  updateFilter(event) {
    this.setState({ filterTrip: event.target.value });
  }

  render() {
    const sortArray = (a, b) => {
      return new Date(a.startDate) - new Date(b.startDate);
    };

    const filteredList = this.props.travels.filter((travel) => {
      if (travel.destination !== undefined && travel.comments !== undefined) {
        if (this.state.isPrinting === true) {
          return checkIfNextMonth(new Date(travel.startDate));
        }

        return travel.destination.toLowerCase().includes(this.state.filterTrip.toLowerCase()) ||
          travel.comments.toLowerCase().includes(this.state.filterTrip.toLowerCase());
      }

      return false;
    });

    const travelListItems = filteredList.sort(sortArray).map((travel) => {
        return (
          <TravelItem
            id={travel.id}
            key={travel.id}
            userId={travel.userId}
            userRole={this.props.userRole}
            destination={travel.destination}
            startDate={travel.startDate}
            endDate={travel.endDate}
            comments={travel.comments}
            deleteTravel={this.props.deleteTravel}
            updateTravel={this.props.updateTravel} />
        );
      });

    return (
      <div>
        <h1 className={cx('header', 'print')}>Your trip plan for next month</h1>
        <div className={cx('actions')}>
          <input className={cx('button', 'primary', 'print-button')} type="button" value="Print next month plan" onClick={this.onPrint.bind(this)} />
          <input className={cx('filter')} value={this.state.filterTrip} placeholder="Filter your trips by destination or comments" onChange={this.updateFilter.bind(this)} />
        </div>
        <br />
        {travelListItems}
      </div>
    );
  }
}

TravelList.propTypes = {
  travels: PropTypes.array.isRequired,
  deleteTravel: PropTypes.func.isRequired,
  updateTravel: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired
};

export default TravelList;
