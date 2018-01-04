import RevolutClient from '../lib';
import runMock from './mock';

let revolutClient: RevolutClient;
beforeAll(() => {
  runMock();
  revolutClient = new RevolutClient({ sandbox: true, apiKey: 'test-api-key' });
});

describe('Payments', () => {
  it('Should create a transfer', async () => {

    const transfer = await revolutClient.payments.transfer({
      request_id: 'e0cbf84637264ee082a848b',
      source_account_id: 'bdab1c20-8d8c-430d-b967-87ac01af060c',
      target_account_id: '5138z40d1-05bb-49c0-b130-75e8cf2f7693',
      amount: 123.11,
      currency: 'EUR',
      description: 'Expenses funding',
    });

    expect(transfer.id).toBeDefined();
    expect(transfer.state).toEqual('completed');
  });

  it('Should create a payment', async () => {
    const payment = await revolutClient.payments.pay({
      request_id: 'e0cbf84637264ee082a848b',
      account_id: 'bdab1c20-8d8c-430d-b967-87ac01af060c',
      receiver: {
        counterparty_id: '5138z40d1-05bb-49c0-b130-75e8cf2f7693',
        account_id: 'db7c73d3-b0df-4e0e-8a9a-f42aa99f52ab',
      },
      amount: 123.11,
      currency: 'EUR',
      description: 'Invoice payment #123',
    });

    expect(payment.id).toBeDefined();
    expect(payment.state).toEqual('completed');
  });

  it('Should schedule a payment', async () => {
    const payment = await revolutClient.payments.pay({
      request_id: 'e0cbf84637264ee082a848b',
      account_id: 'bdab1c20-8d8c-430d-b967-87ac01af060c',
      receiver: {
        counterparty_id: '5138z40d1-05bb-49c0-b130-75e8cf2f7693',
      },
      amount: 123.11,
      currency: 'EUR',
      description: 'Invoice payment #123',
      schedule_for: '2017-10-10',
    });

    expect(payment.state).toEqual('created');
  });
});
