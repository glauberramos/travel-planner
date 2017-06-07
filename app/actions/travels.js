/* eslint consistent-return: 0, no-else-return: 0*/
import * as types from '../utils/types';
import { travelService } from '../services';

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

function guidGenerator() {
    var S4 = function() {
       return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

export function createTravel(destination, comments, startDate, endDate) {
  return (dispatch, getState) => {
    const { travel } = getState();
    const id = guidGenerator();
    const data = { destination, id, comments, startDate, endDate };

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

export function deleteTravel(id) {
  return (dispatch) => {
    return travelService().deleteTravel({ id })
      .then(() => dispatch(destroy(id)));
  };
}

export function updateTravel(id, destination, comments, startDate, endDate) {
  return (dispatch) => {
    return travelService().updateTravel({
      id,
      data: {
        destination: destination,
        comments: comments,
        startDate: startDate,
        endDate: endDate
      }
    })
      .catch(() => dispatch(createTravelFailure({id, error: 'Oops! Something went wrong and we couldn\'t edit your travel'})));
  };
}
