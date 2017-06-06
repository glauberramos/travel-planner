import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;

export default class TravelBox extends Component {
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
      <div>
        <input
          placeholder="Travel destination"
          onChange={this.updateDestination.bind(this)}
          value={this.state.destination} />
        <input
          placeholder="Travel comments"
          onChange={this.updateComments.bind(this)}
          value={this.state.comments} />
        <input
          type="date"
          onChange={this.updateStartDate.bind(this)}
          value={this.state.startDate} />
        <input
          type="date"
          onChange={this.updateEndDate.bind(this)}
          value={this.state.endDate} />
        <button onClick={this.onSave.bind(this)}>
          Create Travel
        </button>
      </div>
    );
  }
};

TravelBox.propTypes = {
  createTravel: PropTypes.func.isRequired
};
