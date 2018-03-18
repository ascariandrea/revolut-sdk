import { AxiosError } from 'axios'
import { Either } from 'fp-ts/lib/Either'
import { Option } from 'fp-ts/lib/Option'
import { UUID } from '../common'
import { Account } from './accounts'
import API from './api'

export interface CounterPartyPayload {
  name: string
  profile_type: 'business' | 'personal'
  phone: string
  email: string
}
export interface CounterParty {
  id: UUID
  name: string
  phone: string
  profile_type: 'business' | 'personal'
  country: string
  state: 'created' | 'deleted'
  type: 'revolut' | 'external'
  created_at: string
  updated_at: string
  accounts: Account[]
}

export default class Counterparies extends API {
  public add = (
    counterparty: CounterPartyPayload
  ): Promise<Either<AxiosError, Option<CounterParty>>> =>
    this.post('/counterparty', counterparty)

  public get = (
    id: string
  ): Promise<Either<AxiosError, Option<CounterParty>>> =>
    this.fetch(`/counterparty/${id}`)

  public getAll = (): Promise<Either<AxiosError, Option<CounterParty[]>>> =>
    this.fetch('/counterparties')

  public del = (
    id: string
  ): Promise<Either<AxiosError, Option<CounterParty>>> =>
    this.delete(`/counterparty/${id}`)
}
