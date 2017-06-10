import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

class UserList extends Component {
  render() {
    const userListItems = this.props.users.map && this.props.users.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            email={user.email}
            role={user.role}
            deleteUser={this.props.deleteUser}
            updateUser={this.props.updateUser} />
        );
      });

    return (
      <div>
        {userListItems}
      </div>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};

export default UserList;
