import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;

export default class TravelBox extends Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.state = {
      destination: '',
      comments: ''
    }
  }

  updateDestination(event) {
    this.setState({ destination: event.target.value });
  }

  updateComments(event) {
    this.setState({ comments: event.target.value });
  }

  onSave() {
    console.log('comments: ', this.state.comments);
    this.props.createTravel(this.state.destination, this.state.comments);
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
      </div>
    );
  }
};

TravelBox.propTypes = {
  createTravel: PropTypes.func.isRequired
};
