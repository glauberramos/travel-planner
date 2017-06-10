/* eslint react/jsx-no-bind: 0*/
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import React, { Component } from 'react';
import styles from './user.css';
import { UserRoles } from '../../utils/userRoles';

const cx = classNames.bind(styles);

export default class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      role: this.props.role,
      password: '',
      editing: false
    };
  }

  onDelete() {
    this.props.deleteUser(this.props.id);
  }

  onUpdate(event) {
    event.preventDefault();
    this.toggleEdit();
    this.props.updateUser(this.props.id,
      this.state.email,
      this.state.role,
      this.state.password);
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

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    const roleOptions = Object.keys(UserRoles).map((role) => {
      return (
        <option key={role} value={UserRoles[role]}>{role}</option>
      );
    });

    return (
      <div className={cx('item', {editing: this.state.editing})}>
        <div className={cx('info')}>
          <span>{this.state.email}</span>
          <span className={cx('role')}>{this.state.role}</span>
          <br />
          <button className={cx('button', 'primary')} onClick={this.toggleEdit.bind(this)}>
            Edit
          </button>
        </div>
        <div className={cx('edit')}>
          <form onSubmit={this.onUpdate.bind(this)}>
            <input
              className={cx('input', 'margin-right')}
              placeholder="email"
              required
              onChange={this.updateEmail}
              value={this.state.email} />
            <select
              className={cx('input', 'margin-right')}
              value={this.state.role}
              onChange={this.updateRole}>
              {roleOptions}
            </select>
            <input
              className={cx('input', 'margin-right')}
              type="password"
              placeholder="Password"
              onChange={this.updatePassword}
              value={this.state.password} />
            <input type="submit" value="Save" className={cx('button', 'save')} />
            <input type="button" value="Delete" className={cx('button', 'delete')} role="button" onClick={this.onDelete.bind(this)} />
            <input type="button" value="Cancel" className={cx('button', 'primary')} role="button" onClick={this.toggleEdit.bind(this)} />
          </form>
        </div>
      </div>
    );
  }
}

UserItem.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  deleteUser: PropTypes.func.isRequired
};
