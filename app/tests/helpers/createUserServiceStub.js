import sinon from 'sinon';
import * as userService from '../../services/users';

const createUserServiceStub = () => ({
  replace: method => ({
    with: (data) => {
      const sandbox = sinon.sandbox.create();
      sandbox.stub(userService, 'default').returns({
        [method]: data
      });
      return sandbox;
    }
  })
});

export default createUserServiceStub;
