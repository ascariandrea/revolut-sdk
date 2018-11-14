# Revolut SDK

[![Build Status](https://circleci.com/gh/ascariandrea/revolut-sdk.svg?style=shield&circle-token=769c00a044724f9068b61e6c0db93083aff234e0)](https://circleci.com/gh/ascariandrea/revolut-sdk)
[![npm version](https://badge.fury.io/js/revolut-sdk.svg)](https://badge.fury.io/js/revolut-sdk)

A typesafe SDK for revolut API.

## Install
```sh
$ yarn add revolut-sdk

# or if you have time to spare

$ npm install revolut-sdk
```

## Usage

```js
import { RevolutClient } from 'revolut-sdk';
const revolut = RevolutClient.run({
  sandbox: true,
  apiKey: 'your-api-key'
});
```

The SDK uses [`Either`](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts) and [`Option`](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts) to model the result returned from API.


#### Accounts
```js
revolut
  .accounts
  .get(accountId: string): TaskEither<AxiosError, Option<Account>>>;

revolut
  .accounts
  .getAll(): TaskEither<AxiosError, Option<Account[]>>>;
```

#### Counterparties

```js
revolut
  .counterparties
  .add(counterparty: Counterparty): TaskEither<AxiosError, Option<Counterparty>>>;

revolut
  .counterparties
  .getAll(): TaskEither<AxiosError, Option<Counterparty[]>>>;

revolut
  .counterparties
  .get(counterpartyId: string): TaskEither<AxiosError, Option<Counterparty>>>;

revolut
  .counterparties
  .del(counterpartyId: string): TaskEither<AxiosError, Option<any>>>;
```

#### Payments

```js
revolut
  .payments
  .transfer(transfer: TransferData): TaskEither<AxiosError, Option<Transaction>>>;

revolut
  .payments
  .pay(payment: PaymentData): TaskEither<AxiosError, Option<Transaction>>>;

revolut
  .payments
  .transactionById(transactionId: string): TaskEither<AxiosError, Option<Transaction>>>;

revolut
  .payments
  .transactionByRequestId(transactionRequestId: string): TaskEither<AxiosError, Option<Transaction>>>;

revolut
  .payments
  .cancel(paymentId: string): TaskEither<AxiosError, Option<any>>>;

revolut
  .payments
  .transactions(transactionsParams?: TransactionParams): TaskEither<AxiosError, Option<Transaction[]>>>;
```


## Test

```
$ yarn test
```
