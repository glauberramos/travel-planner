import { apiEndpoint } from '../../config/app';
import createRestApiClient from '../utils/createRestApiClient';

export default () => {
  const client = createRestApiClient().withConfig({ baseURL: apiEndpoint });
  return {
    getTravels: () => client.request({
      method: 'GET',
      url: '/travels'
    }),
    createTravel: ({ data }) => client.request({
      method: 'POST',
      url: `/travels`,
      data
    })
  };
};
