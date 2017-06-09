import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { formatDate, formatDateBeautifully, daysUntil } from '../../utils/dateFormat';
import styles from './travel';
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
    this.toggleEdit();
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
    const startsIn = daysUntil(new Date(this.state.startDate));

    return (
      <div className={cx('item', { editing: this.state.editing })}>
        { startsIn > 0 ? ( <span className={cx('timeline')}>Starts in: { startsIn } days</span> ) : '' }
        <div className={cx('info')}>  
          <span className={cx('destination')}>{ this.state.destination }</span>
          <span className={cx('date')}>{ formatDateBeautifully(new Date(this.state.startDate)) } - { formatDateBeautifully(new Date(this.state.endDate)) }</span>
          <span className={cx('comments')}>{ this.state.comments }</span>
          <br />
          <button className={cx('button', 'primary')} onClick={ this.toggleEdit.bind(this) }>
            Edit
          </button>
        </div>
        <div className={cx('edit')}>
          <input
            className={cx('input')}
            placeholder="Trip destination"
            onChange={this.updateDestination.bind(this)}
            value={this.state.destination} />
          <input
            className={cx('input', 'date-input', 'margin-right')}
            type="date"
            onChange={this.updateStartDate.bind(this)}
            value={this.state.startDate} />
          <input
            className={cx('input', 'date-input')}
            type="date"
            onChange={this.updateEndDate.bind(this)}
            value={this.state.endDate} />
          <textarea
            className={cx('input')}
            placeholder="Trip comments"
            onChange={this.updateComments.bind(this)}
            value={this.state.comments} />
          <button className={cx('button', 'save')}onClick={ this.onUpdate.bind(this) }>
            Save
          </button>
          <button className={cx('button', 'delete')} onClick={ this.onDelete.bind(this) }>
            Delete
          </button>
          <button className={cx('button', 'primary')} onClick={ this.toggleEdit.bind(this) }>
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
