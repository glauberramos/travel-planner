import React, { Component } from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;

export default class UserCreation extends Component {
  constructor(props) {
    super(props);
    this.state = { email: '', role: '', password: '' }
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
    // this.props.createuser(this.state.email, this.state.role, this.state.password);
  }

  render() {
    return (
      <div>
        <input
          placeholder="Email"
          onChange={this.updateEmail.bind(this)}
          value={this.state.email} />
        <input
          placeholder="Role"
          onChange={this.updateRole.bind(this)}
          value={this.state.role} />
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
