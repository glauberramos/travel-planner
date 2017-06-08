import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { formatDate, formatDateBeautifully } from '../../utils/dateFormat';
import styles from './Travel.css';
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
    }
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

  onDelete() {
    this.props.deleteTravel(this.props.id);
  }

  onUpdate() {
    this.props.updateTravel(this.props.id,
      this.state.destination,
      this.state.comments,
      this.state.startDate,
      this.state.endDate);
  }

  toggleEdit() {
    this.setState({
      editing: !this.state.editing
    });
  }

  render() {
    return (
      <div className={cx('item', { editing: this.state.editing })}>
        <div className={cx('info')}>
          <span className={cx('destination')}>{ this.state.destination }</span>
          <span className={cx('date')}>{ formatDateBeautifully(new Date(this.state.startDate)) } - { formatDateBeautifully(new Date(this.state.endDate)) }</span>
          <span className={cx('comments')}>{ this.state.comments }</span>
          <br />
          <button className={cx('button')} onClick={ this.toggleEdit.bind(this) }>
            Edit
          </button>
        </div>
        <div className={cx('edit')}>
          <input
            placeholder="Trip destination"
            onChange={this.updateDestination.bind(this)}
            value={this.state.destination} />
          <input
            type="date"
            onChange={this.updateStartDate.bind(this)}
            value={this.state.startDate} />
          <input
            type="date"
            onChange={this.updateEndDate.bind(this)}
            value={this.state.endDate} />
          <textarea
            placeholder="Trip comments"
            onChange={this.updateComments.bind(this)}
            value={this.state.comments} />
          <button className={cx('button')} onClick={ this.onDelete.bind(this) }>
            Delete
          </button>
          <button className={cx('button')}onClick={ this.onUpdate.bind(this) }>
            Save
          </button>
          <button className={cx('button')} onClick={ this.toggleEdit.bind(this) }>
            Cancel
          </button>
        </div>
      </div>
    );
  }
};

TravelItem.propTypes = {
  id: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  comments: PropTypes.string.isRequired,
  deleteTravel: PropTypes.func.isRequired
};
