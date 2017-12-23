import RevolutClient from '../lib';
import runMock from './mock';

let revolutClient: RevolutClient;
beforeAll(() => {
  runMock();
  revolutClient = new RevolutClient({ sandbox: true, apiKey: 'test-api-key' });
});

describe('Accounts', () => {
  it('Should get an account', async () => {

    const account = await revolutClient.accounts.get('42');

    expect(account.name).toEqual('EUR expenses account');
  });

  it('Should get a list of accounts', async () => {
    const accounts = await revolutClient.accounts.getAll();
    expect(accounts.length).toEqual(3);
  });
});
