import { UUID } from '../common';
import { responseSerializer } from '../utils';
import { Account } from './accounts';
import API from './api';

export interface CounterPartyPayload {
  name: string;
  profile_type: 'business' | 'personal';
  phone: string;
  email: string;
}
export interface CounterParty {
  id: UUID;
  name: string;
  phone: string;
  profile_type: 'business' | 'personal';
  country: string;
  state: 'created' | 'deleted';
  type: 'revolut' | 'external';
  created_at: string;
  updated_at: string;
  accounts: Account[];
}

export default class Counterparies extends API {

  public add = (counterparty: CounterPartyPayload): Promise<CounterParty> => {
    return this.client.post('/counterparty', counterparty)
      .then(responseSerializer.get);
  }

  public get = (id: string): Promise<CounterParty> => {
    return this.client.get(`/counterparty/${id}`)
      .then(responseSerializer.get);
  }

  public getAll = (): Promise<CounterParty[]> => {
    return this.client.get('/counterparties')
      .then(responseSerializer.get);
  }

  public del = (id: string): Promise<boolean> => {
    return this.client.delete(`/counterparty/${id}`)
      .then(responseSerializer.del);
  }
}
