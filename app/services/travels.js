import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getTravels: () => client.request({
      method: 'GET',
      url: '/travel'
    }),
    createTravel: ({ data }) => client.request({
      method: 'POST',
      url: '/travel',
      data
    }),
    deleteTravel: ({ id }) => client.request({
      method: 'DELETE',
      url: `/travel/${id}`
    }),
    updateTravel: ({ id, data }) => client.request({
      method: 'PUT',
      url: `/travel/${id}`,
      data
    })
  };
};
