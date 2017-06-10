/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../utils/types';
import { travelService } from '../services';
import { guidGenerator } from '../utils/dateFormat';

function destroy(id) {
  return { type: types.DESTROY_TRAVEL, id };
}

function createTravelRequest(data) {
  return {
    type: types.CREATE_TRAVEL_REQUEST,
    destination: data.destination,
    comments: data.comments,
    startDate: data.startDate,
    endDate: data.endDate,
    id: data.id
  };
}

function createTravelSuccess(message) {
  return {
    type: types.CREATE_TRAVEL_SUCCESS,
    message
  };
}

function updateTravelSuccess(message) {
  return {
    type: types.UPDATE_TRAVEL_SUCCESS,
    message
  };
}

function updateTravelFailure(message) {
  return {
    type: types.UPDATE_TRAVEL_FAILURE,
    message
  };
}

function createTravelFailure(message) {
  return {
    type: types.CREATE_TRAVEL_FAILURE,
    message
  };
}

function destroyError(message) {
  return {
    type: types.DESTROY_TRAVEL_ERROR,
    message
  };
}

export function createTravel(destination, comments, startDate, endDate) {
  return (dispatch) => {
    const id = guidGenerator();
    const data = { destination, id, comments, startDate, endDate };

    dispatch(createTravelRequest(data));

    return travelService().createTravel({ data })
      .then((res) => {
        if (res.status === 200) {
          return dispatch(createTravelSuccess('Created trip successfully!'));
        }
      })
      .catch(() => {
        return dispatch(createTravelFailure('Oops! Something went wrong and we couldn\'t create your trip'));
      });
  };
}

export function deleteTravel(id) {
  return (dispatch) => {
    return travelService().deleteTravel({ id })
      .then(() => dispatch(destroy(id)))
      .catch(() => {
        return dispatch(destroyError('Oops! Something went wrong, we couldn\'t delete your trip'));
      });
  };
}

export function updateTravel(id, destination, comments, startDate, endDate) {
  return (dispatch) => {
    return travelService().updateTravel({
      id,
      data: {
        destination,
        comments,
        startDate,
        endDate
      }
    }).then(() => {
      return dispatch(updateTravelSuccess('Updated trip successfully!'));
    })
    .catch(() => dispatch(updateTravelFailure('Oops! Something went wrong and we couldn\'t edit your trip')));
  };
}
