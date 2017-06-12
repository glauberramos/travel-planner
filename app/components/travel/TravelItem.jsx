/* eslint react/jsx-no-bind: 0*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { formatDate, formatDateBeautifully, daysUntil } from '../../utils/dateFormat';
import styles from '../travel/travel.css';
import { UserRoles } from '../../utils/userRoles';

const cx = classNames.bind(styles);

export default class TravelItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      destination: this.props.destination,
      comments: this.props.comments,
      startDate: formatDate(new Date(this.props.startDate)),
      endDate: formatDate(new Date(this.props.endDate)),
      editing: false
    };
  }

  onDelete() {
    this.props.deleteTravel(this.props.id);
  }

  onUpdate(event) {
    event.preventDefault();
    this.toggleEdit();
    this.props.updateTravel(this.props.id,
      this.state.destination,
      this.state.comments,
      this.state.startDate,
      this.state.endDate);
  }

  updateDestination(event) {
    this.setState({ destination: event.target.value });
  }

  updateComments(event) {
    this.setState({ comments: event.target.value });
  }

  updateStartDate(event) {
    this.setState({ startDate: event.target.value });
  }

  updateEndDate(event) {
    this.setState({ endDate: event.target.value });
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    const startsIn = daysUntil(new Date(this.state.startDate));

    return (
      <div className={cx('item', { editing: this.state.editing })}>
        { startsIn > 0 ? (<span className={cx('timeline')}>Starts in { startsIn } days</span>) : '' }
        <div className={cx('info')}>
          <span className={cx('destination')}>{ this.state.destination }</span>
          <span className={cx('date')}>{ formatDateBeautifully(new Date(this.state.startDate)) } - { formatDateBeautifully(new Date(this.state.endDate)) }</span>
          <span className={cx('comments')}>{ this.state.comments }</span>
          {(this.props.userRole === UserRoles.Admin) ? (
            <span className={cx('date')}>UserId: { this.props.userId }</span>
          ) : ''}
          <br />
          <button className={cx('button', 'primary')} onClick={this.toggleEdit.bind(this)}>
            Edit
          </button>
        </div>
        <div className={cx('edit')}>
          <form onSubmit={this.onUpdate.bind(this)}>
            <input
              className={cx('input')}
              placeholder="Trip destination"
              required
              onChange={this.updateDestination.bind(this)}
              value={this.state.destination} />
            <input
              className={cx('input', 'date-input', 'margin-right')}
              type="date"
              required
              onChange={this.updateStartDate.bind(this)}
              value={this.state.startDate} />
            <input
              className={cx('input', 'date-input')}
              type="date"
              required
              onChange={this.updateEndDate.bind(this)}
              value={this.state.endDate} />
            <textarea
              className={cx('input')}
              placeholder="Trip comments"
              onChange={this.updateComments.bind(this)}
              value={this.state.comments} />
            <input type="submit" value="Save" className={cx('button', 'save')} />
            <input type="button" value="Delete" className={cx('button', 'delete')} role="button" onClick={this.onDelete.bind(this)} />
            <input type="button" value="Cancel" className={cx('button', 'primary')} role="button" onClick={this.toggleEdit.bind(this)} />
          </form>
        </div>
      </div>
    );
  }
}

TravelItem.propTypes = {
  id: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  deleteTravel: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  userRole: PropTypes.string.isRequired
};
