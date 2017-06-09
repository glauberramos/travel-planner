import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserRoles } from '../../utils/userRoles';
import classNames from 'classnames/bind';
import { formatDate, formatDateBeautifully, daysUntil } from '../../utils/dateFormat';
import styles from './user.css';
const cx = classNames.bind(styles);

export default class UserItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      role: this.props.role,
      password: '',
      editing: false
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
    event.preventDefault();
    this.toggleEdit();
    this.props.updateUser(this.props.id,
      this.state.email,
      this.state.role,
      this.state.password);
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    const roleOptions = Object.keys(UserRoles).map((role) => {
      return (
        <option key={role} value={ UserRoles[role] }>{ role }</option>
      )
    });

    return (
      <div className={cx('item', { editing: this.state.editing })}>
        <div className={cx('info')}>
          <span>{ this.state.email }</span>
          <span className={cx('role')}>{ this.state.role }</span>
          <br />
          <button className={cx('button', 'primary')} onClick={ this.toggleEdit.bind(this) }>
            Edit
          </button>
        </div>
        <div className={cx('edit')}>
          <form onSubmit={ this.onUpdate.bind(this) }>
            <input
              className={cx('input', 'margin-right')}
              placeholder="email"
              required
              onChange={this.updateEmail.bind(this)}
              value={this.state.email} />
            <select
              className={cx('input', 'margin-right')}
              value={this.state.role}
              onChange={this.updateRole.bind(this)}>
              { roleOptions }
            </select>
            <input
              className={cx('input', 'margin-right')}
              type="password"
              required
              onChange={this.updatePassword.bind(this)}
              value={this.state.password} />
            <input type="submit" value="Save" className={cx('button', 'save')} />
            <button className={cx('button', 'delete')} onClick={ this.onDelete.bind(this) }>
              Delete
            </button>
          </form>
        </div>
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
