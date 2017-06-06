/* eslint consistent-return: 0, no-else-return: 0*/
import md5 from 'spark-md5';
import * as types from '../types';
import { travelService } from '../services';

function createTravelRequest(data) {
  return {
    type: types.CREATE_TRAVEL_REQUEST,
    destination: data.destination,
    comments: data.comments,
    startDate: data.startDate,
    endDate: data.endDate
  };
}

function createTravelSuccess() {
  return {
    type: types.CREATE_TRAVEL_SUCCESS
  };
}

function createTravelFailure(data) {
  return {
    type: types.CREATE_TRAVEL_FAILURE,
    error: data.error
  };
}

export function createTravel(destination, comments, startDate, endDate) {
  return (dispatch, getState) => {
    const { travel } = getState();
    const data = { destination, comments, startDate, endDate };

    dispatch(createTravelRequest(data));

    return travelService().createTravel({ data })
      .then((res) => {
        if (res.status === 200) {
          return dispatch(createTravelSuccess());
        }
      })
      .catch(() => {
        return dispatch(createTravelFailure({ error: 'Oops! Something went wrong and we couldn\'t create your travel'}));
      });
  };
}
