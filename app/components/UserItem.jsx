import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserRoles } from '../utils/UserRoles';

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
    this.props.deleteUser(this.props.id);
  }

  onUpdate() {
    this.props.updateUser(this.props.id,
      this.state.email,
      this.state.role,
      this.state.password);
  }

  render() {
    const roleOptions = Object.keys(UserRoles).map((role) => {
      return (
        <option value={ UserRoles[role] }>{ role }</option>
      )
    });

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
        <select value={this.state.role} onChange={this.updateRole.bind(this)}>
          { roleOptions }
        </select>
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
  role: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired
};
