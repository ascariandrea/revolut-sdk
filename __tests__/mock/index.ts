import * as nock from 'nock';
import RevolutClient from '../../lib';
import { counterparties, counterparty } from './counterparties';

export default function server() {
  return nock(RevolutClient.SANDBOX_URL)
  .get('counterparties')
    .reply(200, counterparties)
  .post('/counterparty')
    .reply(201, counterparty)
  .get('/counterparty/5')
    .reply(200, counterparty);
}
