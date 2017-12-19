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
      return client.get('/counterparties').then(serializer);
    },
    del(id: string): Promise<boolean> {
      return client.delete(`/counterparty/${id}`)
        .then((res: AxiosResponse<boolean>) => res.status === 204);
    },
  };
}
