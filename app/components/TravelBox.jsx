import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;

export default class TravelBox extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
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

  onKeyDown(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      this.onSave();
    }
  }

  render() {
    return (
      <div>
        <input
          placeholder="Travel destination"
          onKeyDown={this.onKeyDown.bind(this)}
          onChange={this.updateDestination.bind(this)}
          value={this.state.destination} />
        <input
          placeholder="Travel comments"
          onKeyDown={this.onKeyDown.bind(this)}
          onChange={this.updateComments.bind(this)}
          value={this.state.comments} />
        <input
          type="date"
          onKeyDown={this.onKeyDown.bind(this)}
          onChange={this.updateStartDate.bind(this)}
          value={this.state.startDate} />
        <input
          type="date"
          onKeyDown={this.onKeyDown.bind(this)}
          onChange={this.updateEndDate.bind(this)}
          value={this.state.endDate} />
      </div>
    );
  }
};

TravelBox.propTypes = {
  createTravel: PropTypes.func.isRequired
};
