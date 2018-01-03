import API from './api';
import { ISODate, ThreeLettersISOCurrencyCode, UUID } from '../common';
import { responseSerializer } from '../utils';
import { AxiosResponse } from 'axios';

export type State = 'pending' | 'completed' | 'declined' | 'failed';
export interface TransferData {
  request_id: string;
  source_account_id: UUID;
  target_account_id: UUID;
  amount: number;
  currency: ThreeLettersISOCurrencyCode;
  description: string;
}

export interface Transfer {
  id: UUID;
  state: State;
  created_at: ISODate;
}

export interface PaymentData {
  request_id: string;
  account_id: UUID;
  receiver: {
    counterparty_id: UUID;
    account_id: UUID;
  };
  amount: number;
  currency: ThreeLettersISOCurrencyCode;
  description: string;
}

export interface Payment {
  id: UUID;
  state: State;
  reason: string;
  created_at: ISODate;
}

export default class Payments extends API {

  public transfer = (transferData: TransferData): Promise<Transfer> => {
    return this.client.post('/transfer', transferData)
      .then<Transfer>((res: AxiosResponse<Transfer>) => responseSerializer.get(res));
  }

  public pay = (paymentData: PaymentData): Promise<Payment> => {
    return this.client.post('/pay', paymentData)
      .then<Payment>((res: AxiosResponse<Payment>) => responseSerializer.get(res));
  }
}
