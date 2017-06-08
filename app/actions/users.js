import { push } from 'react-router-redux';
import { authService } from '../services';
import { userService } from '../services';

import * as types from '../utils/types';

function destroy(id) {
  return { type: types.DESTROY_USER, id };
}

function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(message, role) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    message,
    role
  };
}

function updateSuccess(id) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    id
  };
}

function updateError(message) {
  return {
    type: types.UPDATE_USER_ERROR,
    message
  };
}

function loginError(message) {
  return {
    type: types.LOGIN_ERROR_USER,
    message
  };
}

function signUpError(message) {
  return {
    type: types.SIGNUP_ERROR_USER,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(message) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message
  };
}

function crateUserSuccess(data) {
  return {
    type: types.CREATE_USER_SUCCESS,
    data
  };
}

function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER };
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER };
}

export function toggleLoginMode() {
  return { type: types.TOGGLE_LOGIN_MODE };
}

export function manualLogin(data) {
  return (dispatch) => {
    dispatch(beginLogin());

    return authService().login(data)
      .then((response) => {
          dispatch(loginSuccess('You have been successfully logged in', response.data.userRole));
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(loginError('Oops! Invalid username or password'));
      });
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return authService().signUp(data)
      .then((response) => {
          dispatch(signUpSuccess('You have successfully registered an account!', data.role));
          dispatch(push('/'));
      })
      .catch((err) => {
        dispatch(signUpError('Oops! Something went wrong when signing up'));
      });
  };
}

export function createUser(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return userService().createUser(data)
      .then((response) => {
          dispatch(crateUserSuccess(data));
      })
      .catch((err) => {
        dispatch(signUpError('Oops! Something went wrong when signing up'));
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then((response) => {
          dispatch(logoutSuccess());
          dispatch(push('/login'));
      })
      .catch((err) => {
        dispatch(logoutError());
      });
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    return userService().deleteUser({ id })
      .then(() => dispatch(destroy(id)));
  };
}

export function updateUser(id, email, role, password) {
  return (dispatch) => {
    return userService().updateUser({
      id,
      data: {
        email: email,
        role: role,
        password: password
      }
      }).then((response) => {
          dispatch(updateSuccess(id));
      })
      .catch(() => dispatch(updateError({error: 'Oops! Something went wrong and we couldn\'t edit user'})));
  };
}
