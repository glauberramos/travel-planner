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
    })
  };
};
