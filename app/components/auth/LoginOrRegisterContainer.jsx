/* eslint react/forbid-prop-types: 0, no-shadow: 0, jsx-a11y/no-static-element-interactions: 0, react/no-find-dom-node: 0, react/no-string-refs: 0*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames/bind';
import { connect } from 'react-redux';
import { manualLogin, signUp, toggleLoginMode } from '../../actions/users';
import styles from './login.css';
import { UserRoles } from '../../utils/userRoles';

const cx = classNames.bind(styles);

class LoginOrRegister extends Component {
  constructor(props) {
    super(props);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnSubmit(event) {
    event.preventDefault();

    const { manualLogin, signUp, user: { isLogin } } = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    const role = UserRoles.User;

    if (isLogin) {
      manualLogin({ email, password });
    } else {
      signUp({ email, password, role });
    }
  }

  renderHeader() {
    const { user: { isLogin }, toggleLoginMode } = this.props;
    if (isLogin) {
      return (
        <div className={cx('header')}>
          <h1 className={cx('heading')}>Login</h1>
          <div className={cx('alternative')}>
            Not registered?
            <a
              className={cx('alternative-link')}
              onClick={toggleLoginMode}
            >Register an Account</a>
          </div>
        </div>
      );
    }

    return (
      <div className={cx('header')}>
        <h1 className={cx('heading')}>Register</h1>
        <div className={cx('alternative')}>
          Already have an account?
          <a
            className={cx('alternative-link')}
            onClick={toggleLoginMode}
          >Login</a>
        </div>
      </div>
    );
  }

  render() {
    const { isWaiting, message, isLogin } = this.props.user;

    return (
      <div
        className={cx('login', {
          waiting: isWaiting
        })}
      >
        <div className={cx('container')}>
          { this.renderHeader() }
          <div className={cx('email-container')}>
            <form onSubmit={this.handleOnSubmit}>
              <input
                className={cx('input')}
                type="email"
                ref="email"
               placeholder="email"
              />
              <input
                className={cx('input')}
                type="password"
                ref="password"
                placeholder="password"
              />
              <p
                className={cx('message', {
                'message-show': message && message.length > 0
              })}>{message}</p>
              <input
                className={cx('button')}
                type="submit"
                value={isLogin ? 'Login' : 'Register'} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginOrRegister.propTypes = {
  user: PropTypes.object.isRequired,
  manualLogin: PropTypes.func.isRequired,
  signUp: PropTypes.func.isRequired,
  toggleLoginMode: PropTypes.func.isRequired
};

function mapStateToProps({user}) {
  return {
    user
  };
}

export default connect(mapStateToProps, { manualLogin, signUp, toggleLoginMode })(LoginOrRegister);
