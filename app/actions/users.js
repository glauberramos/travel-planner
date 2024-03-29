import { push } from 'react-router-redux';
import { authService, userService } from '../services';
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

function updateSuccess(id, message) {
  return {
    type: types.UPDATE_USER_SUCCESS,
    message,
    id
  };
}

function updateError(message) {
  return {
    type: types.UPDATE_USER_ERROR,
    message
  };
}

function destroyError(message) {
  return {
    type: types.DESTROY_USER_ERROR,
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

function createUserError(message) {
  return {
    type: types.CREATE_USER_ERROR,
    message
  };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function beginCreateUser() {
  return { type: types.CREATE_USER };
}

function signUpSuccess(message, role) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    message,
    role
  };
}

function createUserSuccess(data, message) {
  return {
    type: types.CREATE_USER_SUCCESS,
    data,
    message
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
      .catch(() => {
        dispatch(loginError('Oops! Invalid username or password'));
      });
  };
}

export function signUp(data) {
  return (dispatch) => {
    dispatch(beginSignUp());

    return authService().signUp(data)
      .then((response) => {
          dispatch(signUpSuccess('You have successfully registered an account!', response.data.userRole));
          dispatch(push('/'));
      })
      .catch(() => {
        dispatch(signUpError('Oops! Something went wrong when signing up'));
      });
  };
}

export function createUser(data) {
  return (dispatch) => {
    dispatch(beginCreateUser());

    return userService().createUser(data)
      .then(() => {
          dispatch(createUserSuccess(data, 'User successfully created!'));
      })
      .catch((err) => {
        console.log(err);
        dispatch(createUserError('Oops! Something went wrong when creating user'));
      });
  };
}

export function logOut() {
  return (dispatch) => {
    dispatch(beginLogout());

    return authService().logOut()
      .then(() => {
          dispatch(logoutSuccess());
          dispatch(push('/login'));
      })
      .catch(() => {
        dispatch(logoutError());
      });
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    return userService().deleteUser({ id })
      .then(() => dispatch(destroy(id)))
    .catch(() => {
      dispatch(destroyError('Error while deleting user'));
    });
  };
}

export function updateUser(id, email, role, password) {
  let data;

  if (password === '' || password === undefined) {
    data = { email, role };
  } else {
    data = { email, role, password };
  }

  return (dispatch) => {
    return userService().updateUser({ id, data })
    .then(() => {
      dispatch(updateSuccess(id, 'User successfully updated!'));
    })
    .catch(() => {
      dispatch(updateError('Oops! Something went wrong and we couldn\'t edit user'));
    });
  };
}
