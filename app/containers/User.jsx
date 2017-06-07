import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserCreation from '../components/UserCreation';
import UserList from '../components/UserList';
import { signUp, deleteUser } from '../actions/users';

class User extends Component {
  render() {
    return (
      <div>
        <UserCreation createUser={ this.props.signUp } />
        <UserList users={ this.props.users }
          deleteUser={ this.props.deleteUser } />
      </div>
    );
  }
}

User.propTypes = {
  users: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    users: state.user.users
  };
}

export default connect(mapStateToProps, { signUp, deleteUser })(User);
