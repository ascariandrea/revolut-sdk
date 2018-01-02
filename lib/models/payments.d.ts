import { UUID, ISODate, ThreeLettersISOCurrencyCode } from "./common";


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
