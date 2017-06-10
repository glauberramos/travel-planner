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
            type: types.CREATE_TRAVEL_SUCCESS
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
            error: 'Oops! Something went wrong and we couldn\'t create your travel'
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
});
