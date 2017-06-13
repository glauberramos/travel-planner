import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import TravelList from '../../components/travel/TravelList';
import TravelItem from '../../components/travel/TravelItem';

const emptyData = [];
const travelItemData = [{
  id: '',
  key: '',
  userId: 'userId',
  userRole: 'user',
  destination: 'test',
  startDate: '2017-10-10',
  endDate: '2017-10-11',
  comments: 'comments',
  deleteTravel: () => {},
  updateTravel: () => {}
}];
const stubFunctions = {
  deleteTravel: () => {},
  updateTravel: () => {}
};

describe('<TravelList />', () => {
  describe('With Trips', () => {
    it('should render <TravelItem> list items', () => {
      expect(shallow(<TravelList travels={travelItemData} userRole="user" {...stubFunctions} />).find(TravelItem).length).toBe(1);
    });
  });

  describe('Without Trips', () => {
    it('should not render <TravelItem> list items', () => {
      expect(shallow(<TravelList travels={emptyData} userRole="user" {...stubFunctions} />).find(TravelItem).length).toBe(0);
    });
  });
});
