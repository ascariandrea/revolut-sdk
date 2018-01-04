import * as nock from 'nock';
import RevolutClient from '../../lib';
import { account, accounts } from './accounts';
import { counterparties, counterparty } from './counterparties';
import { payment, scheduledPayment, transaction, transfer } from './payments';

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
    .reply(204)
  // Payments
  .post('/transfer')
    .reply(201, transfer)
  .post('/pay', (body) => !!body.schedule_for)
    .reply(201, scheduledPayment)
  .post('/pay')
    .reply(201, payment)
  .get('/transaction/62b61a4f-fb09-4e87-b0ab-b66c85f5485c')
    .reply(200, transaction)
  .get('/transaction/e0cbf84637264ee082a848b?id_type=request_id')
    .reply(200, transaction)
  ;

}
