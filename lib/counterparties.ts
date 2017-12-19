import { AxiosInstance, AxiosResponse } from 'axios';

const serializer = (res: AxiosResponse<RevolutSDK.CounterParty>) => res.data;

export default function counterparies(client: AxiosInstance) {
  return {
    add(counterparty: RevolutSDK.CounterPartyPayload): Promise<RevolutSDK.CounterParty> {
      return client.post('/counterparty', counterparty)
        .then(serializer);
    },
    get(id: string): Promise<RevolutSDK.CounterParty> {
      return client.get(`/counterparty/${id}`).then(serializer);
    },
    getAll(): Promise<RevolutSDK.CounterParty> {
      return client.get('/counterparies').then(serializer);
    },
    del(id: string): Promise<RevolutSDK.CounterParty> {
      return client.delete(`/counterpary/${id}`)
        .then(serializer);
    },
  };
}
