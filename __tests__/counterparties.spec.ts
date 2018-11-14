import { Some } from 'fp-ts/lib/Option'
import { RevolutClient } from '../lib'
import { Counterparty } from '../lib/api/counterparties'
import runMock from './mock'

let revolut: RevolutClient
beforeAll(() => {
  runMock()
  revolut = RevolutClient.run({ sandbox: true, apiKey: 'test-api-key' })
})

describe('Counterparties', () => {
  it('Should add a counterparty', async () => {
    const counterparty = await revolut.counterparties
      .add({
        email: 'john@smith.co',
        name: 'John Smith Co.',
        phone: '+44723456789',
        profile_type: 'personal'
      })
      .run()

    expect(counterparty.isRight()).toBe(true)
    expect((counterparty.value as Some<Counterparty>).isSome()).toBe(true)
    expect((counterparty.value as Some<Counterparty>).value.name).toEqual(
      'John Smith Co.'
    )
  })

  it('Should get a counterpart', async () => {
    const counterparty = await revolut.counterparties.get('5').run()

    expect(counterparty.isRight()).toBe(true)
    expect((counterparty.value as Some<Counterparty>).isSome()).toBe(true)
    expect((counterparty.value as Some<Counterparty>).value.name).toEqual(
      'John Smith Co.'
    )
  })

  it('Should get a list of counterparties', async () => {
    const counterparties = await revolut.counterparties.getAll().run()

    expect(counterparties.isRight()).toBe(true)
    expect((counterparties.value as Some<Counterparty[]>).isSome()).toBe(true)
    expect((counterparties.value as Some<Counterparty[]>).value.length).toBe(2)
  })

  it('Should delete a counterparty', async () => {
    const deleted = await revolut.counterparties.del('5').run()

    expect(deleted.isRight()).toEqual(true)
    expect((deleted.value as Some<any>).isSome()).toEqual(true)
  })
})
