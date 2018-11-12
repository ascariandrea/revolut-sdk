import { Some } from 'fp-ts/lib/Option'
import { RevolutClient } from '../lib'
import { Account } from '../lib/api/accounts'
import runMock from './mock'

let revolut: RevolutClient
beforeAll(() => {
  runMock()
  revolut = RevolutClient.run({ sandbox: true, apiKey: 'test-api-key' })
})

describe('Accounts', () => {
  it('Should get an account', async () => {
    const account = await revolut.accounts.get('42').run()

    expect(account.isRight()).toBe(true)
    expect((account.value as Some<Account>).isSome()).toBe(true)
    expect((account.value as Some<Account>).value.name).toEqual(
      'EUR expenses account'
    )
  })

  it('Should get a list of accounts', async () => {
    const accounts = await revolut.accounts.getAll().run()

    expect(accounts.isRight()).toBe(true)
    expect((accounts.value as Some<Account[]>).value.length).toEqual(3)
  })
})
