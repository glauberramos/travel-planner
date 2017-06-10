import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import sinon from 'sinon';
import * as actions from '../travels';
import * as types from '../../utils/types';
import createTravelServiceStub from '../../tests/helpers/createTravelServiceStub';
import * as dateFormat from '../../utils/dateFormat';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Travels Async Actions', () => {
  let store;
  let stub;

  const initialState = {
    isLogin: true,
    message: '',
    isWaiting: false,
    authenticated: false
  };

  const response = {
    data: {
      message: 'Success',
      userRole: 'user'
    },
    status: 200
  };

  const data = {
    comments: 'Comments',
    destination: 'Destination',
    endDate: '2017-07-22',
    startDate: '2017-07-28'
  };

  describe('createTravel', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createTravelServiceStub().replace('createTravel').with(() => Promise.resolve(response));
        sinon.stub(dateFormat, 'guidGenerator').returns('abc');
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch CREATE_TRAVEL_REQUEST, CREATE_TRAVEL_SUCCESS', (done) => {
        const expectedActions = [{
            type: types.CREATE_TRAVEL_REQUEST,
            ...data,
            id: 'abc'
          }, {
            type: types.CREATE_TRAVEL_SUCCESS,
            message: "Created trip successfully!"
          }
        ];

        store.dispatch(actions.createTravel(data.destination, data.comments, data.startDate, data.endDate))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        stub = createTravelServiceStub().replace('createTravel').with(() => Promise.reject({status: 401}));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch CREATE_TRAVEL_REQUEST and CREATE_TRAVEL_FAILURE', (done) => {
        const expectedActions = [
          {
            type: types.CREATE_TRAVEL_REQUEST,
            ...data,
            id: 'abc'
          }, {
            type: types.CREATE_TRAVEL_FAILURE,
            message: 'Oops! Something went wrong and we couldn\'t create your trip'
          }
        ];

        store.dispatch(actions.createTravel(data.destination, data.comments, data.startDate, data.endDate))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('deleteTravel', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createTravelServiceStub().replace('deleteTravel').with(() => Promise.resolve(response));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch DESTROY_TRAVEL, DESTROY_TRAVEL_SUCCESS', (done) => {
        const expectedActions = [{
          type: types.DESTROY_TRAVEL,
          id: 'abc'
        }];

        store.dispatch(actions.deleteTravel('abc'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        stub = createTravelServiceStub().replace('deleteTravel').with(() => Promise.reject({status: 401}));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch DESTROY_TRAVEL_ERROR', (done) => {
        const expectedActions = [
          {
            type: types.DESTROY_TRAVEL_ERROR,
            message: 'Oops! Something went wrong, we couldn\'t delete your trip'
          }
        ];

        store.dispatch(actions.deleteTravel('abc'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('updateTravel', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createTravelServiceStub().replace('updateTravel').with(() => Promise.resolve(response));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch UPDATE_TRAVEL_SUCCESS', (done) => {
        const expectedActions = [{
          type: types.UPDATE_TRAVEL_SUCCESS,
          message: "Updated trip successfully!"
        }];

        store.dispatch(actions.updateTravel('abc', data.destination, data.comments, data.startDate, data.endDate))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        stub = createTravelServiceStub().replace('updateTravel').with(() => Promise.reject({status: 401}));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch UPDATE_TRAVEL_FAILURE', (done) => {
        const expectedActions = [
          {
            type: types.UPDATE_TRAVEL_FAILURE,
            message: "Oops! Something went wrong and we couldn't edit your trip"
          }
        ];

        store.dispatch(actions.updateTravel('abc', data.destination, data.comments, data.startDate, data.endDate))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });
});
