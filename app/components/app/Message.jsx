/* eslint react/forbid-prop-types: 0, no-shadow: 0, jsx-a11y/no-static-element-interactions: 0*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import { dismissMessage } from '../../actions/messages';
import styles from './message.css';

const cx = classNames.bind(styles);

const Message = ({message, type, dismissMessage}) => (
  <div
    className={cx('message', {
      show: message && message.length > 0,
      success: type === 'SUCCESS',
      error: type === 'ERROR'
    })}
    onClick={dismissMessage}>{message}</div>
);

Message.defaultProps = {
  message: '',
  type: ''
};

Message.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  dismissMessage: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {...state.message};
}

export default connect(mapStateToProps, { dismissMessage })(Message);
