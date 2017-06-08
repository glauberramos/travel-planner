import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../actions/users';
import styles from '../css/components/navigation';
import { UserRoles } from '../utils/UserRoles';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    const usersTab = ((user.userRole ===  UserRoles.Manager) || (user.userRole ===  UserRoles.Admin)) && user.authenticated ? (
      <Link className={cx('item')} to="/users">Users</Link>
    ) : '';

    return (
      <nav className={cx('navigation')} role="navigation">
        <Link to="/" className={cx('item', 'logo')} activeClassName={cx('active')}>Travel Planner</Link>
        { ((user.userRole ===  UserRoles.User) || (user.userRole ===  UserRoles.Admin)) && user.authenticated ? (
          <Link className={cx('item')} to="/trips">Trips</Link>
        ) : '' }
        { usersTab }
        { user.authenticated ? (
          <Link onClick={logOut} className={cx('item')} to="/">Logout</Link>
        ) : (
          <Link className={cx('item')} to="/login">Log in</Link>
        )}
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
