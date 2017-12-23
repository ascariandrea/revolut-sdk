import { AxiosInstance } from 'axios';
import { responseSerializer } from './utils';

export default function counterparies(client: AxiosInstance) {
  return {
    add(counterparty: RevolutSDK.CounterPartyPayload): Promise<RevolutSDK.CounterParty> {
      return client.post('/counterparty', counterparty)
        .then(responseSerializer.get);
    },
    get(id: string): Promise<RevolutSDK.CounterParty> {
      return client.get(`/counterparty/${id}`).then(responseSerializer.get);
    },
    getAll(): Promise<RevolutSDK.CounterParty> {
      return client.get('/counterparties').then(responseSerializer.get);
    },
    del(id: string): Promise<boolean> {
      return client.delete(`/counterparty/${id}`)
        .then(responseSerializer.del);
    },
  };
}
