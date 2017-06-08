import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import UserCreation from '../user/UserCreation';
import UserList from '../user/UserList';
import { createUser, deleteUser, updateUser } from '../../actions/users';
import { Link } from 'react-router';
import { UserRoles } from '../../utils/userRoles';

class User extends Component {
  render() {
    return (
      <div>
        { ((this.props.userRole === UserRoles.Manager) || (this.props.userRole === UserRoles.Admin)) ?
          ( <div>
              <UserCreation createUser={ this.props.createUser } />
              <UserList users={ this.props.users }
                deleteUser={ this.props.deleteUser }
                updateUser={ this.props.updateUser } />
            </div>
          ) : (
            <Link to="/trips">
              <button>Manage Trips</button>
            </Link> )
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
