import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import TravelCreation from './TravelCreation';
import TravelList from './TravelList';
import { createTravel, deleteTravel, updateTravel } from '../../actions/travels';
import { UserRoles } from '../../utils/userRoles';
import classNames from 'classnames/bind';
import styles from './travel';
const cx = classNames.bind(styles);

class Travel extends Component {
  render() {
    const { travels, createTravel, deleteTravel, updateTravel, userRole } = this.props;
    return (
      <div>
        { ((userRole === UserRoles.User) || (userRole === UserRoles.Admin)) ?
          ( <div className={cx('container')}>
              <TravelCreation createTravel={ createTravel } />
              <TravelList travels={ travels }
                deleteTravel={ deleteTravel }
                updateTravel={ updateTravel } />
            </div>
          ) : (
            <Link to="/users">
              <button className={cx('button', 'primary')}>Manage Users</button>
            </Link> )
          }
      </div>
    );
  }
}

Travel.propTypes = {
  travels: PropTypes.array.isRequired,
  userRole: PropTypes.string.isRequired,
  createTravel: PropTypes.func.isRequired,
  deleteTravel: PropTypes.func.isRequired,
  updateTravel: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    travels: state.travel,
    userRole: state.user.userRole
  };
}

export default connect(mapStateToProps, { createTravel, deleteTravel, updateTravel })(Travel);
