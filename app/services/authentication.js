import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    login: ({ email, password }) => client.request({
      method: 'POST',
      url: '/sessions',
      data: {
        email,
        password
      }
    }),
    signUp: ({ email, password, role }) => client.request({
      method: 'POST',
      url: '/signup',
      data: {
        email,
        password,
        role
      }
    }),
    logOut: () => client.request({
      method: 'DELETE',
      url: '/sessions'
    })
  };
};
