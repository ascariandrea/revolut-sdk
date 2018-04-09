import { AxiosError } from 'axios'
import { Either } from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import {
  ISOCountryCode,
  ISODate,
  ThreeLettersISOCurrencyCode,
  UUID
} from '../common'
import API from './api'

export type State = 'pending' | 'completed' | 'declined' | 'failed'
export interface TransferData {
  request_id: string
  source_account_id: UUID
  target_account_id: UUID
  amount: number
  currency: ThreeLettersISOCurrencyCode
  description: string
}

export interface Transfer {
  id: UUID
  state: State
  created_at: ISODate
}

export interface PaymentData {
  request_id: string
  account_id: UUID
  receiver: {
    counterparty_id: UUID
    account_id?: UUID
  }
  amount: number
  currency: ThreeLettersISOCurrencyCode
  description: string
  schedule_for?: ISODate
}

export interface Payment {
  id: UUID
  state: State
  reason: string
  created_at: ISODate
}
export interface Leg {
  leg_id: UUID
  amount: number
  currency: ThreeLettersISOCurrencyCode
  bill_amount?: number
  bill_currency?: ThreeLettersISOCurrencyCode
  account_id: UUID
  counterparty: {
    id: UUID
    account_id: UUID
    type: 'self' | 'revolut' | 'external'
  }
  description: string
  explanation: string
  card: {
    card_number: string
    first_name: string
    last_name: string
    phone: string
  }
}

export interface Transaction {
  id: UUID
  type: string
  request_id: string
  state: State
  reason?: 'declined' | 'failed'
  created_at: ISODate
  updated_at: ISODate
  completed_at?: ISODate
  schedule_for?: ISODate
  merchant?: {
    name: string
    city: string
    category_code: string
    country: ISOCountryCode
  }
  legs: Leg[]
}

export interface TransactionsParams {
  from?: ISODate
  to?: ISODate
  counterparty?: UUID
  count?: number
  type?: string
}

export default class Payments extends API {
  public transfer = (
    transferData: TransferData
  ): TaskEither<AxiosError, Option<Transfer>> =>
    this.post('/transfer', transferData)

  public pay = (
    paymentData: PaymentData
  ): TaskEither<AxiosError, Option<Payment>> => this.post('/pay', paymentData)

  public transactionById = (
    transactionId: string
  ): TaskEither<AxiosError, Option<Transaction>> =>
    this.fetch(`/transaction/${transactionId}`)

  public transactionByRequestId = (
    requestId: string
  ): TaskEither<AxiosError, Option<Transaction>> =>
    this.fetch(`/transaction/${requestId}`, {
      params: { id_type: 'request_id' }
    })

  public cancel = (transactonId: string): TaskEither<AxiosError, Option<any>> =>
    this.delete(`/transaction/${transactonId}`)

  public transactions = (
    params?: TransactionsParams
  ): TaskEither<AxiosError, Option<Transaction[]>> =>
    this.fetch('/transactions', { params })
}
