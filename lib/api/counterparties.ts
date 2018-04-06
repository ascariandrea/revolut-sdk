import { AxiosError } from 'axios'
import { Option } from 'fp-ts/lib/Option'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { UUID } from '../common'
import { Account } from './accounts'
import API from './api'

export interface CounterPartyPayload {
  name: string
  profile_type: 'business' | 'personal'
  phone: string
  email: string
}
export interface Counterparty {
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

export default class Counterparties extends API {
  public add = (
    counterparty: CounterPartyPayload
  ): TaskEither<AxiosError, Option<Counterparty>> =>
    this.post('/counterparty', counterparty)

  public get = (id: string): TaskEither<AxiosError, Option<Counterparty>> =>
    this.fetch(`/counterparty/${id}`)

  public getAll = (): TaskEither<AxiosError, Option<Counterparty[]>> =>
    this.fetch('/counterparties')

  public del = (id: string): TaskEither<AxiosError, Option<Counterparty>> =>
    this.delete(`/counterparty/${id}`)
}
