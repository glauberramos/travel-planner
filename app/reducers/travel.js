import * as types from '../types';

const travel = (
  state = {},
  action
) => {
  switch (action.type) {
    case types.CREATE_TRAVEL_REQUEST:
      return {
        destination: action.destination,
        comments: action.comments,
        startDate: action.startDate,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

const travels = (
  state = [],
  action
) => {
  switch (action.type) {
    case types.REQUEST_SUCCESS:
      if (action.data) return action.data;
      return state;
    case types.CREATE_TRAVEL_REQUEST:
      return [...state, travel(undefined, action)];
    case types.CREATE_TRAVEL_FAILURE:
      return state.filter(t => t.id !== action.id);
    case types.DESTROY_TRAVEL:
      return state.filter(t => t.id !== action.id);
    default:
      return state;
  }
};

export default travels;
