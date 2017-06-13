/* eslint react/prefer-stateless-function: 0, react/forbid-prop-types: 0*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import UserCreation from './UserCreation';
import UserList from './UserList';
import { createUser, deleteUser, updateUser } from '../../actions/users';
import { UserRoles } from '../../utils/userRoles';
import styles from './../../css/user.css';

const cx = classNames.bind(styles);

export class User extends Component {
  render() {
    return (
      <div>
        { ((this.props.userRole === UserRoles.Manager) || (this.props.userRole === UserRoles.Admin)) ?
          (<div className={cx('container')}>
            <UserCreation createUser={this.props.createUser} />
            <UserList
              users={this.props.users}
              deleteUser={this.props.deleteUser}
              updateUser={this.props.updateUser} />
          </div>
          ) : (
            <Link to="/trips">
              <button className={cx('button', 'primary')}>Manage Trips</button>
            </Link>)
          }
      </div>
    );
  }
}

User.propTypes = {
  users: PropTypes.array.isRequired,
  createUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.user.users,
    userRole: state.user.userRole
  };
}

export default connect(mapStateToProps, { createUser, deleteUser, updateUser })(User);
