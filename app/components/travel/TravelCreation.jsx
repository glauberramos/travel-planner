/* eslint react/jsx-no-bind: 0*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './travel.css';

const cx = classNames.bind(styles);

export default class TravelCreation extends Component {
  constructor(props) {
    super(props);
    this.state = { destination: '', comments: '', startDate: '', endDate: '' };
  }

  onSave(event) {
    event.preventDefault();
    this.props.createTravel(this.state.destination, this.state.comments, this.state.startDate, this.state.endDate);
    this.setState({ destination: '', comments: '', startDate: '', endDate: '' });
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

  render() {
    return (
      <div className={cx('create-box')}>
        <h1 className={cx('header')}>Plan your next trip!</h1>
        <form onSubmit={this.onSave.bind(this)}>
          <input
            className={cx('input-create')}
            required
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
            required
            type="date"
            onChange={this.updateStartDate.bind(this)}
            value={this.state.startDate} />
          <input
            className={cx('input-create')}
            required
            type="date"
            onChange={this.updateEndDate.bind(this)}
            value={this.state.endDate} />
          <input
            type="submit"
            className={cx('button', 'save', 'no-margin')}
            value="Create Trip" />
        </form>
      </div>
    );
  }
}

TravelCreation.propTypes = {
  createTravel: PropTypes.func.isRequired
};
