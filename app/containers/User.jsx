import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserCreation from '../components/UserCreation';
import UserList from '../components/UserList';
import { signUp } from '../actions/users';

class User extends Component {
  render() {
    return (
      <div>
        <UserCreation createUser={ signUp } />
        <UserList users={ this.props.users } />
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

export default connect(mapStateToProps, { })(User);
