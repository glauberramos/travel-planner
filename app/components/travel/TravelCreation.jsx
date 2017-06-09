import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Travel.css';
const cx = classNames.bind(styles);

const ENTER_KEY_CODE = 13;

export default class TravelCreation extends Component {
  constructor(props) {
    super(props);
    this.state = { destination: '', comments: '', startDate: '', endDate: '' }
  }

  updateDestination(event) {
    this.setState({ destination: event.target.value });
  }

  updateComments(event) {
    this.setState({ comments: event.target.value });
  }

  updateStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  updateEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  onSave() {
    this.props.createTravel(this.state.destination, this.state.comments, this.state.startDate, this.state.endDate);
  }

  render() {
    return (
      <div className={cx('create-box')}>
        <h1 className={cx('header')}>Plan your next trip!</h1>
        <input
          className={cx('input-create')}
          placeholder="Destination"
          onChange={this.updateDestination.bind(this)}
          value={this.state.destination} />
        <input
          className={cx('input-create')}
          placeholder="Comments"
          onChange={this.updateComments.bind(this)}
          value={this.state.comments} />
        <input
          className={cx('input-create')}
          type="date"
          onChange={this.updateStartDate.bind(this)}
          value={this.state.startDate} />
        <input
          className={cx('input-create')}
          type="date"
          onChange={this.updateEndDate.bind(this)}
          value={this.state.endDate} />
        <button
          className={cx('button', 'primary', 'no-margin')}
          onClick={this.onSave.bind(this)}>
          Create Trip
        </button>
      </div>
    );
  }
};

TravelCreation.propTypes = {
  createTravel: PropTypes.func.isRequired
};
