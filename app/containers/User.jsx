import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserCreation from '../components/UserCreation';
import UserList from '../components/UserList';
import { createUser, deleteUser, updateUser } from '../actions/users';

class User extends Component {
  render() {
    return (
      <div>
        <UserCreation createUser={ this.props.createUser } />
        <UserList users={ this.props.users }
          deleteUser={ this.props.deleteUser }
          updateUser={ this.props.updateUser } />
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
    users: state.user.users
  };
}

export default connect(mapStateToProps, { createUser, deleteUser, updateUser })(User);
