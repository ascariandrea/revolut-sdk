import * as nock from 'nock';
import RevolutClient from '../../lib';
import { account, accounts } from './accounts';
import { counterparties, counterparty } from './counterparties';

export default function server() {
  return nock(RevolutClient.SANDBOX_URL)
  // Accounts
  .get('/accounts/42')
    .reply(200, account)
  .get('/accounts')
    .reply(200, accounts)

  // Counterparties
  .get('/counterparties')
    .reply(200, counterparties)
  .post('/counterparty')
    .reply(201, counterparty)
  .get('/counterparty/5')
    .reply(200, counterparty)
  .delete('/counterparty/5')
    .reply(204);
}
