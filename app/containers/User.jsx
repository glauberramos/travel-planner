import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserList from '../components/UserList';

class User extends Component {
  render() {
    return (
      <UserList users={ this.props.users } />
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
