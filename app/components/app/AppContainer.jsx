/* eslint react/forbid-prop-types: 0*/
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Navigation from '../navigation/Navigation';
import Message from './Message';
import styles from './../../css/main.css';

const cx = classNames.bind(styles);

const AppContainer = ({ children }) => {
  return (
    <div className={cx('app')}>
      <Navigation />
      <Message />
      {children}
    </div>
  );
};

AppContainer.propTypes = {
  children: PropTypes.object.isRequired
};

export default AppContainer;
