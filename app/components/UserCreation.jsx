import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserRoles } from '../utils/userRoles';

const ENTER_KEY_CODE = 13;

export default class UserCreation extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', role: 'user', password: '' }
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

  onSave() {
    this.props.createUser({ email: this.state.email, role: this.state.role, password: this.state.password });
  }

  render() {
    const roleOptions = Object.keys(UserRoles).map((role) => {
      return (
        <option key={role} value={ UserRoles[role] }>{ role }</option>
      )
    });

    return (
      <div>
        <input
          placeholder="Email"
          onChange={this.updateEmail.bind(this)}
          value={this.state.email} />
        <select onChange={this.updateRole.bind(this)}>
          { roleOptions }
        </select>
        <input
          type="password"
          onChange={this.updatePassword.bind(this)}
          value={this.state.password} />
        <button onClick={this.onSave.bind(this)}>
          Create User
        </button>
      </div>
    );
  }
};

UserCreation.propTypes = {
  createUser: PropTypes.func.isRequired
};
