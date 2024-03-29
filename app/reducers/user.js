import { combineReducers } from 'redux';
import * as types from '../utils/types';

const isLogin = (
  state = true,
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
      return !state;
    default:
      return state;
  }
};

const message = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.TOGGLE_LOGIN_MODE:
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return '';
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
      return action.message;
    default:
      return state;
  }
};

const isWaiting = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.MANUAL_LOGIN_USER:
    case types.SIGNUP_USER:
    case types.LOGOUT_USER:
      return true;
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_SUCCESS_USER:
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_ERROR_USER:
      return false;
    default:
      return state;
  }
};

const authenticated = (
  state = false,
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
    case types.LOGOUT_ERROR_USER:
      return true;
    case types.LOGIN_ERROR_USER:
    case types.SIGNUP_ERROR_USER:
    case types.LOGOUT_SUCCESS_USER:
      return false;
    default:
      return state;
  }
};

const users = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
    case types.UPDATE_USER_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.DESTROY_USER:
      return state.filter(user => user.id !== action.id);
    case types.CREATE_USER_SUCCESS:
      if (action.data) return [...state, action.data];
      return state;
    default:
      return state;
  }
};

const userRole = (
  state = '',
  action
) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return action.role || '';
    default:
      return state;
  }
};

const userReducer = combineReducers({
  isLogin,
  isWaiting,
  authenticated,
  message,
  users,
  userRole
});

export default userReducer;
