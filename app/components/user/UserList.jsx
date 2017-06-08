import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from './UserItem';

export default class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userListItems = this.props.users.map && this.props.users.map((user, key) => {
        return (
          <UserItem
            key={ user.id }
            id={ user.id }
            email={ user.email }
            role={ user.role }
            deleteUser={ this.props.deleteUser }
            updateUser={ this.props.updateUser } />
        );
      });

    return (
      <div>
        { userListItems }
      </div>
    )
  }
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired
};
