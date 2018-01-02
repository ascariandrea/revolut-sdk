import { AxiosInstance, AxiosResponse } from 'axios';
import { CounterParty } from './models/counterparties';
import { Transfer, TransferData } from './models/payments';
import { responseSerializer } from './utils';

export default function payments(client: AxiosInstance) {
  return {
    get(id: string): Promise<CounterParty> {
      return client.get(`/accounts/${id}`).then(responseSerializer.get);
    },
    getAll(): Promise<CounterParty> {
      return client.get('/accounts').then(responseSerializer.get);
    },
    transfer(transferData: TransferData): Promise<Transfer> {
      return client.post('/transfer', transferData)
        .then<Transfer>((res: AxiosResponse<Transfer>) => responseSerializer.get(res));
    },
  };
}
