import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Travel } from '../../components/travel/TravelContainer';
import TravelCreation from '../../components/travel/TravelCreation';
import TravelList from '../../components/travel/TravelList';

describe('<TravelContainer />', () => {
  describe('With user admin', () => {
    it('should shallow <TravelCreation> and <TravelList>', () => {
      expect(shallow(<Travel userRole="admin" />).find(TravelCreation).length).toBe(1);
      expect(shallow(<Travel userRole="admin" />).find(TravelList).length).toBe(1);
    });
  });

  describe('With user manager', () => {
    it('should render <TravelCreation> and <TravelList>', () => {
      expect(shallow(<Travel userRole="manager" />).find(TravelCreation).length).toBe(0);
      expect(shallow(<Travel userRole="manager" />).find(TravelList).length).toBe(0);
      expect(shallow(<Travel userRole="manager" />).find('button').length).toBe(1);
    });
  });

  describe('With user user', () => {
    it('should shallow <TravelCreation> and <TravelList>', () => {
      expect(shallow(<Travel userRole="user" />).find(TravelCreation).length).toBe(1);
      expect(shallow(<Travel userRole="user" />).find(TravelList).length).toBe(1);
    });
  });
});
