import RevolutClient from '../lib'
import runMock from './mock'
import { CounterParty } from '../lib/api/counterparties'
import { Some } from 'fp-ts/lib/Option'

let revolutClient: RevolutClient
beforeAll(() => {
  runMock()
  revolutClient = new RevolutClient({ sandbox: true, apiKey: 'test-api-key' })
})

describe('Counterparties', () => {
  it('Should add a counterparty', async () => {
    const counterparty = await revolutClient.counterparties.add({
      email: 'john@smith.co',
      name: 'John Smith Co.',
      phone: '+44723456789',
      profile_type: 'personal'
    })
    expect(counterparty.isRight()).toBe(true)
    expect((counterparty.value as Some<CounterParty>).isSome()).toBe(true)
    expect((counterparty.value as Some<CounterParty>).value.name).toEqual(
      'John Smith Co.'
    )
  })

  it('Should get a counterpart', async () => {
    const counterparty = await revolutClient.counterparties.get('5')

    expect(counterparty.isRight()).toBe(true)
    expect((counterparty.value as Some<CounterParty>).isSome()).toBe(true)
    expect((counterparty.value as Some<CounterParty>).value.name).toEqual(
      'John Smith Co.'
    )
  })

  it('Should get a list of counterparties', async () => {
    const counterparties = await revolutClient.counterparties.getAll()

    expect(counterparties.isRight()).toBe(true)
    expect((counterparties.value as Some<CounterParty[]>).isSome()).toBe(true)
    expect((counterparties.value as Some<CounterParty[]>).value.length).toBe(2)
  })

  it('Should delete a counterparty', async () => {
    const deleted = await revolutClient.counterparties.del('5')
    expect(deleted.isRight()).toEqual(true)
    expect((deleted.value as Some<any>).isSome()).toEqual(true)
  })
})
