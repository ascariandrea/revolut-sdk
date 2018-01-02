import API from './api';
import { ISODate, ThreeLettersISOCurrencyCode, UUID } from '../common';
import { responseSerializer } from '../utils';

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
  state: 'pending' | 'completed' | 'declined' | 'failed';
  created_at: ISODate;
}

export default class Payments extends API {

  public transfer = (transferData: TransferData): Promise<Transfer> => {
    return this.client.post('/transfer', transferData)
      .then<Transfer>((res: AxiosResponse<Transfer>) => responseSerializer.get(res));
  }
}
