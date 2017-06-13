import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import UserList from '../../components/user/UserList';
import UserItem from '../../components/user/UserItem';

const emptyData = [];
const userItemData = [{
  id: '',
  key: '',
  email: 'email',
  role: 'user',
  deleteUser: () => {},
  updateUser: () => {}
}];
const stubFunctions = {
  deleteUser: () => {},
  updateUser: () => {}
};

describe('<UserList />', () => {
  describe('With Users', () => {
    it('should render <UserItem> list items', () => {
      expect(shallow(<UserList users={userItemData} {...stubFunctions} />).find(UserItem).length).toBe(1);
    });
  });

  describe('Without Users', () => {
    it('should not render <UserItem> list items', () => {
      expect(shallow(<UserList users={emptyData} {...stubFunctions} />).find(UserItem).length).toBe(0);
    });
  });
});
