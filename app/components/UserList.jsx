import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserItem from '../components/UserItem';

export default class UserList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const userListItems = this.props.users.map((user, key) => {
        return (
          <UserItem
            key={ user.id }
            id={ user.id }
            email={ user.email }
            role={ user.role } />
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
  users: PropTypes.array.isRequired
};
