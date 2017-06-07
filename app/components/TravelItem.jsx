import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TravelItem extends Component {
  constructor(props) {
    super(props);
    this.state = { destination: this.props.destination,
      comments: this.props.comments,
      startDate: this.props.startDate,
      endDate: this.props.endDate
    }
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

  onDelete() {
    this.props.deleteTravel(id);
  }

  render() {
    return (
      <div>
        { this.state.destination }
        { this.state.startDate }
        { this.state.endDate }
        { this.state.comments }
        <br />
        <button onClick={ this.onDelete.bind(this) }>
          Delete travel
        </button>
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
        <button>
          Edit Travel
        </button>
      </div>
    );
  }
};

TravelItem.propTypes = {
  id: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  deleteTravel: PropTypes.func.isRequired
};
