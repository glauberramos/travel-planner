import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserRoles } from '../../utils/userRoles';
import classNames from 'classnames/bind';
import styles from './user.css';
const cx = classNames.bind(styles);

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

  onSave(event) {
    event.preventDefault();
    this.props.createUser({ email: this.state.email, role: this.state.role, password: this.state.password });
    this.setState({ email: '', role: 'user', password: '' });
  }

  render() {
    const roleOptions = Object.keys(UserRoles).map((role) => {
      return (
        <option key={role} value={ UserRoles[role] }>{ role }</option>
      )
    });

    return (
      <div className={cx('create-box')}>
        <h1 className={cx('header')}>Register users</h1>
        <form onSubmit={ this.onSave.bind(this) }>
          <input
            className={cx('input-create')}
            placeholder="Email"
            required
            onChange={this.updateEmail.bind(this)}
            value={this.state.email} />
          <select
            className={cx('input-create')}
            onChange={this.updateRole.bind(this)}>
            { roleOptions }
          </select>
          <input
            className={cx('input-create')}
            type="password"
            placeholder="Password"
            required
            onChange={this.updatePassword.bind(this)}
            value={this.state.password} />
          <input
            type="submit"
            className={cx('button', 'save', 'no-margin')}
            value="Create User" />
        </form>
      </div>
    );
  }
};

UserCreation.propTypes = {
  createUser: PropTypes.func.isRequired
};
