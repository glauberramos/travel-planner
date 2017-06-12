/* eslint react/prefer-stateless-function: 0, react/forbid-prop-types: 0*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import TravelCreation from './TravelCreation';
import TravelList from './TravelList';
import { createTravel, deleteTravel, updateTravel } from '../../actions/travels';
import { UserRoles } from '../../utils/userRoles';
import styles from './../../css/travel.css';

const cx = classNames.bind(styles);

class Travel extends Component {
  render() {
    return (
      <div>
        {((this.props.userRole === UserRoles.User) || (this.props.userRole === UserRoles.Admin)) ?
        (<div className={cx('container')}>
          <TravelCreation
            createTravel={this.props.createTravel} />
          <TravelList
            travels={this.props.travels}
            deleteTravel={this.props.deleteTravel}
            updateTravel={this.props.updateTravel}
            userRole={this.props.userRole} />
        </div>
        ) : (
          <Link to="/users">
            <button className={cx('button', 'primary')}>Manage Users</button>
          </Link>)
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
