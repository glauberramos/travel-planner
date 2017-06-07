import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class User extends Component {
  render() {
    return (
      <div>
        { this.props.users.length }
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
