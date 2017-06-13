import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import TravelItem from '../../components/travel/TravelItem';

describe('<TravelItem />', () => {
  describe('Starts in info', () => {
    it('should have starts in', () => {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + 1);
      expect(shallow(<TravelItem startDate={ currentDate } />).find('.timeline').length).toBe(1);
    });

    it('should not render starts in', () => {
      expect(shallow(<TravelItem startDate="2015-10-10" />).find('.timeline').length).toBe(0);
    });
  });

  describe('UserId info', () => {
    it('should render userId', () => {
      expect(shallow(<TravelItem userRole="admin" />).find('.userId').length).toBe(1);
    });

    it('should not render userId', () => {
      expect(shallow(<TravelItem userRole="user" />).find('.userId').length).toBe(0);
    });
  });
});
