import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      role: this.props.role,
      password: ''
    }
  }

  updateEmail(event) {
    this.setState({ email: event.target.value });
  }

  updateRole(event) {
    this.setState({ role: event.target.value });
  }

  updatePassword(event) {
    this.setState({ password: event.target.value });
  }

  onDelete() {
    // this.props.Travel(this.props.id);
  }

  onUpdate() {
    // this.props.updateTravel(this.props.id,
    //   this.state.destination,
    //   this.state.comments,
    //   this.state.startDate,
    //   this.state.endDate);
  }

  render() {
    return (
      <div>
        { this.props.id }
        { this.state.email }
        { this.state.role }
        <br />
        <button onClick={ this.onDelete.bind(this) }>
          Delete user
        </button>
        <input
          placeholder="email"
          onChange={this.updateEmail.bind(this)}
          value={this.state.email} />
        <input
          placeholder="role"
          onChange={this.updateRole.bind(this)}
          value={this.state.role} />
        <input
          type="password"
          onChange={this.updatePassword.bind(this)}
          value={this.state.password} />
        <button onClick={ this.onUpdate.bind(this) }>
          Edit User
        </button>
      </div>
    );
  }
};

UserItem.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired
};
