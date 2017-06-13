import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { User } from '../../components/user/UserContainer';
import UserCreation from '../../components/user/UserCreation';
import UserList from '../../components/user/UserList';

describe('<UserContainer />', () => {
  describe('With user admin', () => {
    it('should shallow <UserCreation> and <UserList>', () => {
      expect(shallow(<User userRole="admin" />).find(UserCreation).length).toBe(1);
      expect(shallow(<User userRole="admin" />).find(UserList).length).toBe(1);
    });
  });

  describe('With user manager', () => {
    it('should render <UserCreation> and <UserList>', () => {
      expect(shallow(<User userRole="manager" />).find(UserCreation).length).toBe(1);
      expect(shallow(<User userRole="manager" />).find(UserList).length).toBe(1);
    });
  });

  describe('With user user', () => {
    it('should shallow <UserCreation> and <UserList>', () => {
      expect(shallow(<User userRole="user" />).find(UserCreation).length).toBe(0);
      expect(shallow(<User userRole="user" />).find(UserList).length).toBe(0);
      expect(shallow(<User userRole="user" />).find('button').length).toBe(1);
    });
  });
});
