import { responseSerializer } from '../utils';
import API from './api';
import { ISODate, ThreeLettersISOCurrencyCode, UUID } from './common';

export interface Account {
  id: UUID;
  name: string;
  balance: number;
  currency: ThreeLettersISOCurrencyCode;
  state: 'active' | 'inactive';
  public: boolean;
  created_at: ISODate;
  updated_at: ISODate;
  type: 'pocket' | 'beneficiary';
}

export default class Accounts extends API {

  public get = (id: string): Promise<Account> => {
    return this.client.get(`/accounts/${id}`).then(responseSerializer.get);
  }

  public getAll = (): Promise<Account[]> => {
    return this.client.get('/accounts').then(responseSerializer.get);
  }
}
