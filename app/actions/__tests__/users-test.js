import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import * as actions from '../users';
import * as types from '../../utils/types';
import createAuthServiceStub from '../../tests/helpers/createAuthServiceStub';
import createUserServiceStub from '../../tests/helpers/createUserServiceStub';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Users Async Actions', () => {
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
    email: 'hello@world.com',
    password: '2BeOrNot2Be'
  };

  const dataCreate = {
    email: 'hello@world.com',
    password: '2BeOrNot2Be',
    role: 'manager'
  };

  describe('manualLogin', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createAuthServiceStub().replace('login').with(() => Promise.resolve(response));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch MANUAL_LOGIN_USER, LOGIN_SUCCESS_USER and route path change actions', (done) => {
        const expectedActions = [{
            type: types.MANUAL_LOGIN_USER
          }, {
            type: types.LOGIN_SUCCESS_USER,
            message: 'You have been successfully logged in',
            role: 'user'
          }, {
            payload: {
              args: ['/'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        store.dispatch(actions.manualLogin(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        stub = createAuthServiceStub().replace('login').with(() => Promise.reject({status: 401}));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch MANUAL_LOGIN_USER and LOGIN_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: types.MANUAL_LOGIN_USER
          },
          {
            type: types.LOGIN_ERROR_USER,
            message: 'Oops! Invalid username or password'
          }
        ];

        store.dispatch(actions.manualLogin(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('signUp', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createAuthServiceStub().replace('signUp').with(() => Promise.resolve(response));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch SIGNUP_USER, SIGNUP_SUCCESS_USER and route path change actions', (done) => {
        const expectedActions = [{
            type: types.SIGNUP_USER
          }, {
            type: types.SIGNUP_SUCCESS_USER,
            message: 'You have successfully registered an account!',
            role: 'user'
          }, {
            payload: {
              args: ['/'],
              method: 'push'
            },
            type: '@@router/CALL_HISTORY_METHOD'
          }
        ];

        store.dispatch(actions.signUp(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        stub = createAuthServiceStub().replace('signUp').with(() => Promise.reject({status: 401}));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch SIGNUP_USER and SIGNUP_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: types.SIGNUP_USER
          },
          {
            type: types.SIGNUP_ERROR_USER,
            message: 'Oops! Something went wrong when signing up'
          }
        ];

        store.dispatch(actions.signUp(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('createUser', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createUserServiceStub().replace('createUser').with(() => Promise.resolve(response));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch CREATE_USER, CREATE_USER_SUCCESS', (done) => {
        const expectedActions = [{
            type: types.CREATE_USER
          }, {
            type: types.CREATE_USER_SUCCESS,
            data: dataCreate
          }
        ];

        store.dispatch(actions.createUser(dataCreate))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        stub = createUserServiceStub().replace('createUser').with(() => Promise.reject({status: 401}));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch CREATE_USER and SIGNUP_ERROR_USER', (done) => {
        const expectedActions = [
          {
            type: types.CREATE_USER
          },
          {
            type: types.SIGNUP_ERROR_USER,
            message: 'Oops! Something went wrong when creating user'
          }
        ];

        store.dispatch(actions.createUser(data))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('deleteUser', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createUserServiceStub().replace('deleteUser').with(() => Promise.resolve(response));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch DESTROY_USER', (done) => {
        const expectedActions = [{
            type: types.DESTROY_USER,
            id: '123'
          }
        ];

        store.dispatch(actions.deleteUser('123'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        stub = createUserServiceStub().replace('deleteUser').with(() => Promise.reject({status: 401}));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch DESTROY_USER_ERROR', (done) => {
        const expectedActions = [
          {
            type: types.DESTROY_USER_ERROR,
            message: 'Error while deleting user'
          }
        ];

        store.dispatch(actions.deleteUser('123'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('updateUser', () => {
    describe('on success', () => {
      beforeEach(() => {
        stub = createUserServiceStub().replace('updateUser').with(() => Promise.resolve(response));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch UPDATE_USER_SUCCESS', (done) => {
        const expectedActions = [{
            type: types.UPDATE_USER_SUCCESS,
            id: '123'
          }
        ];

        store.dispatch(actions.updateUser('123'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });

    describe('on failure', () => {
      beforeEach(() => {
        stub = createUserServiceStub().replace('updateUser').with(() => Promise.reject({status: 401}));
        store = mockStore(initialState);
      });

      afterEach(() => {
        stub.restore();
      });

      it('should dispatch UPDATE_USER_ERROR', (done) => {
        const expectedActions = [
          {
            type: types.UPDATE_USER_ERROR,
            message: 'Oops! Something went wrong and we couldn\'t edit user'
          }
        ];

        store.dispatch(actions.updateUser('123'))
          .then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
          })
          .catch(done);
      });
    });
  });

  describe('logOut', () => {
    beforeEach(() => {
      stub = createAuthServiceStub().replace('logOut').with(() => Promise.resolve({status: 200}));
      store = mockStore(initialState);
    });

    afterEach(() => {
      stub.restore();
    });

    it('should dispatch LOGOUT_USER, LOGOUT_SUCCESS_USER', (done) => {
      const expectedActions = [
        {
          type: types.LOGOUT_USER
        },
        {
          type: types.LOGOUT_SUCCESS_USER
        },
        {
          payload: {
            args: [
              '/login'
            ],
            method: 'push'
          },
          type: '@@router/CALL_HISTORY_METHOD'
        }
      ];

      store.dispatch(actions.logOut(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        })
        .catch(done);
    });
  });
});
