import { travelService } from '../services';

const fetchTravelData = () => {
  return travelService().getTravels()
  .then(res => res.data)
  .catch(() => []);
};

export default fetchTravelData;
