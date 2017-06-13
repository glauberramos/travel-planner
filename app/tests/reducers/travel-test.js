import expect from 'expect';
import reducer from '../../reducers/travel';
import * as types from '../../utils/types';

describe('Travels reducer', () => {
  const initialState = [];

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual(initialState);
  });

  it('should handle REQUEST_SUCCESS', () => {
    expect(
      reducer(undefined, {
        type: types.REQUEST_SUCCESS,
        data: ['1', '2', '3']
      })
    ).toEqual(['1', '2', '3']);
  });

  it('should handle CREATE_TRAVEL_REQUEST', () => {
    expect(
      reducer(undefined, {
        type: types.CREATE_TRAVEL_REQUEST,
        comments: 'comments',
        destination: 'destination',
        endDate: '2017-10-10',
        id: 'id',
        startDate: '2017-10-09'
      })
    ).toEqual([{
        "comments": "comments",
        "destination": "destination",
        "endDate": "2017-10-10",
        "id": "id",
        "startDate": "2017-10-09"
      }]);
  });

  it('should handle DESTROY_TRAVEL', () => {
    expect(
      reducer([{
          "id": "id",
        }, {
          "id": "id2"
        }], {
        type: types.DESTROY_TRAVEL,
        id: 'id',
      })
    ).toEqual([{
      "id": "id2"
    }]);
  });
});
