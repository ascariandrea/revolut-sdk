import { Some } from 'fp-ts/lib/Option'
import RevolutClient from '../lib'
import { Account } from '../lib/api/accounts'
import runMock from './mock'

let revolutClient: RevolutClient
beforeAll(() => {
  runMock()
  revolutClient = new RevolutClient({ sandbox: true, apiKey: 'test-api-key' })
})

describe('Accounts', () => {
  it('Should get an account', async () => {
    const account = await revolutClient.accounts.get('42')

    expect(account.isRight()).toBe(true)
    expect((account.value as Some<Account>).isSome()).toBe(true)
    expect((account.value as Some<Account>).value.name).toEqual(
      'EUR expenses account'
    )
  })

  it('Should get a list of accounts', async () => {
    const accounts = await revolutClient.accounts.getAll()

    expect(accounts.isRight()).toBe(true)
    expect((accounts.value as Some<Account[]>).value.length).toEqual(3)
  })
})
