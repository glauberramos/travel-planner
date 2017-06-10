import sinon from 'sinon';
import * as travelService from '../../services/travels';

const createTravelServiceStub = () => ({
  replace: method => ({
    with: (data) => {
      const sandbox = sinon.sandbox.create();
      sandbox.stub(travelService, 'default').returns({
        [method]: data
      });
      return sandbox;
    }
  })
});

export default createTravelServiceStub;
