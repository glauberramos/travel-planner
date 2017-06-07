import { userService } from '../services';

const fetchUserData = () => {
  return userService().getUsers()
  .then(res => res.data)
  .catch(() => []);
};

export default fetchUserData;
