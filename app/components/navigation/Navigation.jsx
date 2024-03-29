/* eslint react/forbid-prop-types: 0, no-shadow: 0*/
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { logOut } from '../../actions/users';
import styles from './../../css/navigation.css';
import { UserRoles } from '../../utils/userRoles';

const cx = classNames.bind(styles);

const Navigation = ({ user, logOut }) => {
    const usersTab = ((user.userRole === UserRoles.Manager) || (user.userRole === UserRoles.Admin)) && user.authenticated ? (
      <Link className={cx('item')} activeClassName={cx('active')} to="/users">Users</Link>
    ) : '';

    return (
      <nav className={cx('navigation')} role="navigation">
        <Link to="/" className={cx('item', 'logo')}>
          <svg className={cx('svg')} xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="50px" height="50px" viewBox="150 0 300 350">
            <defs>
              <g id="Layer0_0_FILL">
                <path
                  fill="#fff"
                  stroke="none"
                  d="
                  M 300.55 193.75
                  Q 310.5 183.75 310.4 169.7 310.45 155.65 300.5 145.7 290.5 135.65 276.5 135.65
                  L 276.5 169.75 252.45 145.7
                  Q 242.45 155.65 242.4 169.75 242.45 183.75 252.45 193.8 262.4 203.75 276.4 203.75 290.55 203.7 300.55 193.75
                  M 369.9 165.2
                  Q 369.9 164.5 369.9 163.85 369.45 125.45 342.2 98.2 326.25 82.25 306.45 75.35 306.35 75.35 306.1 75.35 291.85 70.45 275.65 70.35 275.4 70.35 275.05 70.35 258.35 70.35 243.75 75.35 243.5 75.5 243.25 75.6 223.75 82.35 207.9 98.2 180.65 125.45 180.15 163.85 180.15 164.5 180.15 165.2 180.15 170.85 180.8 176.4 181.25 181.15 182.25 185.95 185.55 201.55 193.9 214.95 195.25 217.15 196.75 219.2
                  L 265.7 324.15
                  Q 265.85 324.4 266.1 324.65 266.7 325.5 267.45 326.25 270.85 329.7 275.55 329.7
                  L 275.65 329.7
                  Q 280.3 329.55 283.65 326.25 284.5 325.4 285.25 324.3 285.5 324.05 285.6 323.7
                  L 335.3 247.1 304.05 215.85
                  Q 291.65 223.6 276 223.65 253.9 223.65 238.25 208 222.6 192.3 222.55 170.15 222.55 147.95 238.2 132.3 253.85 116.65 276.05 116.65 298.25 116.65 313.9 132.35 329.55 148 329.5 170.15 329.55 185.2 322.3 197.25
                  L 349.8 224.75 353.6 218.85
                  Q 354.95 216.9 356.3 214.8 364.9 201.05 367.95 185 368.8 181.15 369.3 177.35 369.3 176.9 369.45 176.4 369.9 171 369.9 165.2 Z" />
              </g>
            </defs>
            <g transform="matrix( 1, 0, 0, 1, 0,0)" >
              <use xlinkHref="#Layer0_0_FILL" />
            </g>
          </svg>
          TriPlanner
        </Link>
        { ((user.userRole === UserRoles.User) || (user.userRole === UserRoles.Admin)) && user.authenticated ? (
          <Link className={cx('item')} to="/trips" activeClassName={cx('active')}>Trips</Link>
        ) : '' }
        { usersTab }
        { user.authenticated ? (
          <Link onClick={logOut} className={cx('item')} to="/">Logout</Link>
        ) : (
          <Link className={cx('item')} to="/login" activeClassName={cx('active')}>Log in</Link>
        )}
      </nav>
    );
};

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps, { logOut })(Navigation);
