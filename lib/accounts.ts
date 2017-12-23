import { AxiosInstance } from 'axios';
import { responseSerializer } from './utils';

export default function counterparies(client: AxiosInstance) {
  return {
    get(id: string): Promise<RevolutSDK.CounterParty> {
      return client.get(`/accounts/${id}`).then(responseSerializer.get);
    },
    getAll(): Promise<RevolutSDK.CounterParty> {
      return client.get('/accounts').then(responseSerializer.get);
    },
  };
}
