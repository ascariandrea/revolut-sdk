import { AxiosError } from 'axios'
import { Option } from 'fp-ts/lib/Option'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { ISODate, ThreeLettersISOCurrencyCode, UUID } from '../common'
import API from './api'

export interface Account {
  id: UUID
  name: string
  balance: number
  currency: ThreeLettersISOCurrencyCode
  state: 'active' | 'inactive'
  public: boolean
  created_at: ISODate
  updated_at: ISODate
  type: 'pocket' | 'beneficiary'
}

export default class Accounts extends API {
  public get = (id: string): TaskEither<AxiosError, Option<Account>> =>
    this.fetch(`/accounts/${id}`)

  public getAll = (): TaskEither<AxiosError, Option<Account[]>> =>
    this.fetch<Account[]>('/accounts')
}
