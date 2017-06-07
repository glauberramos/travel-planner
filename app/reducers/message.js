import * as types from '../types';

export default function message(state = {
  message: '',
  type: 'SUCCESS'
}, action = {}) {
  switch (action.type) {
    case types.LOGIN_SUCCESS_USER:
    case types.SIGNUP_SUCCESS_USER:
      return {...state, message: action.message, type: 'SUCCESS'};
    case types.DISMISS_MESSAGE:
      return {...state, message: '', type: 'SUCCESS'};
    default:
      return state;
  }
}
