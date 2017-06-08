import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Navigation from '../navigation/Navigation';
import Message from '../app/Message';
import styles from '../../css/main';

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
  children: PropTypes.object
};

export default AppContainer;
