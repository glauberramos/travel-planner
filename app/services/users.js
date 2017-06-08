import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getUsers: () => client.request({
      method: 'GET',
      url: '/user'
    }),
    deleteUser: ({ id }) => client.request({
      method: 'DELETE',
      url: `/user/${id}`
    }),
    updateUser: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/user/${id}`,
      data
    }),
    createUser: ({ email, password, role }) => client.request({
      method: 'POST',
      url: `/user`,
      data: {
        email,
        password,
        role
      }
    })
  };
};
