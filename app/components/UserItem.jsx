import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      role: this.props.role
    }
  }

  render() {
    return (
      <div>
        { this.props.id }
        { this.state.email }
        { this.state.role }
      </div>
    );
  }
};

UserItem.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};
