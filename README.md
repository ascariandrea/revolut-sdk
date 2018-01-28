# Revolut SDK

[![Build Status](https://circleci.com/gh/ascariandrea/revolut-sdk.svg?style=shield&circle-token=769c00a044724f9068b61e6c0db93083aff234e0)](https://circleci.com/gh/ascariandrea/revolut-sdk)

A typesafe SDK for revolut API.

## Usage

```js
import Revolut from 'revolut-sdk';
const revolut = new RevolutClient({
  sandbox: true,
  apiKey: 'your-api-key'
});
```

#### Accounts
```js
const accounts = await revolut.accounts.getAll();
const account = await revolut.account.getById(accountId);
```

#### Counterparties
```js
const counterparty =  await revolut.counterparties.add({
  email: 'john@smith.co',
  name: 'John Smith Co.',
  phone: '+44723456789',
  profile_type: 'personal',
});

const counterparty = await revolut.counterparties.get(counterparty.id);

const counterparties = await revolut.counterparties.getAll();

const deleted = await revolut.counterparties.del(counterparty.id);
```

#### Payments
```js
const transfer = await revolut.payments.transfer({
  request_id: 'e0cbf84637264ee082a848b',
  source_account_id: 'bdab1c20-8d8c-430d-b967-87ac01af060c',
  target_account_id: '5138z40d1-05bb-49c0-b130-75e8cf2f7693',
  amount: 123.11,
  currency: 'EUR',
  description: 'Expenses funding',
});

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

// scheduled payment
const scheduledPayment = await revolutClient.payments.pay({
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

const transaction = await revolutClient.payments.transactionById(payment.id);

const transaction = await revolutClient.payments.transactionByRequestId(payment.request_id);

const deleted = await revolutClient.payments.cancel(payment.id);
const transactions = await revolutClient.payments.transactions({
  from: '2017-06-01',
  to: '2017-06-10',
  counterparty: '5138z40d1-05bb-49c0-b130-75e8cf2f7693',
  count: 10,
});
```


## Test

```
$ yarn test
```
