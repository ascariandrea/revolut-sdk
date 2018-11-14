import { Some } from 'fp-ts/lib/Option'
import { RevolutClient } from '../lib'
import { Payment, Transaction } from '../lib/api/payments'
import runMock from './mock'

let revolut: RevolutClient
beforeAll(() => {
  runMock()
  revolut = RevolutClient.run({ sandbox: true, apiKey: 'test-api-key' })
})

describe('Payments', () => {
  it('Should create a transfer', async () => {
    const transfer = await revolut.payments
      .transfer({
        request_id: 'e0cbf84637264ee082a848b',
        source_account_id: 'bdab1c20-8d8c-430d-b967-87ac01af060c',
        target_account_id: '5138z40d1-05bb-49c0-b130-75e8cf2f7693',
        amount: 123.11,
        currency: 'EUR',
        description: 'Expenses funding'
      })
      .run()

    expect(transfer.isRight()).toBe(true)
    expect((transfer.value as Some<Transaction>).value.id).toBeDefined()
    expect((transfer.value as Some<Transaction>).value.state).toEqual(
      'completed'
    )
  })

  it('Should create a payment', async () => {
    const payment = await revolut.payments
      .pay({
        request_id: 'e0cbf84637264ee082a848b',
        account_id: 'bdab1c20-8d8c-430d-b967-87ac01af060c',
        receiver: {
          counterparty_id: '5138z40d1-05bb-49c0-b130-75e8cf2f7693',
          account_id: 'db7c73d3-b0df-4e0e-8a9a-f42aa99f52ab'
        },
        amount: 123.11,
        currency: 'EUR',
        description: 'Invoice payment #123'
      })
      .run()

    expect(payment.value).toBeInstanceOf(Some)
    expect((payment.value as Some<Payment>).value.state).toEqual('completed')
  })

  it('Should schedule a payment', async () => {
    const payment = await revolut.payments
      .pay({
        request_id: 'e0cbf84637264ee082a848b',
        account_id: 'bdab1c20-8d8c-430d-b967-87ac01af060c',
        receiver: {
          counterparty_id: '5138z40d1-05bb-49c0-b130-75e8cf2f7693'
        },
        amount: 123.11,
        currency: 'EUR',
        description: 'Invoice payment #123',
        schedule_for: '2017-10-10'
      })
      .run()

    expect(payment.isRight()).toBe(true)
    expect((payment.value as Some<Payment>).value.state).toEqual('created')
  })

  it('Should request a transaction by id', async () => {
    const transactionId = '62b61a4f-fb09-4e87-b0ab-b66c85f5485c'
    const transaction = await revolut.payments
      .transactionById(transactionId)
      .run()

    expect(transaction.isRight()).toBe(true)
    expect((transaction.value as Some<Transaction>).isSome()).toBe(true)
    expect((transaction.value as Some<Transaction>).value).toMatchObject({
      id: transactionId,
      type: 'transfer'
    })
  })

  it('Shuold request a transaction by request id', async () => {
    const requestId = 'e0cbf84637264ee082a848b'
    const transaction = await revolut.payments
      .transactionByRequestId(requestId)
      .run()

    expect(transaction.isRight()).toBe(true)
    expect((transaction.value as Some<Transaction>).isSome()).toBe(true)
    expect((transaction.value as Some<Transaction>).value).toMatchObject({
      request_id: requestId,
      type: 'transfer'
    })
  })

  it('Should cancel a payment', async () => {
    const transactionId = '62b61a4f-fb09-4e87-b0ab-b66c85f5485c'
    const deleted = await revolut.payments.cancel(transactionId).run()

    expect(deleted.isRight()).toBe(true)
    expect((deleted.value as Some<any>).isSome()).toBe(true)
  })

  it('Should get a list of transactions', async () => {
    const transactions = await revolut.payments
      .transactions({
        from: '2017-06-01',
        to: '2017-06-10',
        counterparty: '5138z40d1-05bb-49c0-b130-75e8cf2f7693',
        count: 10
      })
      .run()

    expect(transactions.isRight()).toBe(true)
    expect((transactions.value as Some<Transaction[]>).isSome()).toBe(true)
    expect((transactions.value as Some<Transaction[]>).value).toBeInstanceOf(
      Array
    )
    expect(
      (transactions.value as Some<Transaction[]>).value.length
    ).toBeLessThanOrEqual(10)
  })
})
