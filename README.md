# Revolut SDK

[![Build Status](https://circleci.com/gh/ascariandrea/revolut-sdk.svg?style=shield&circle-token=769c00a044724f9068b61e6c0db93083aff234e0)](https://circleci.com/gh/ascariandrea/revolut-sdk)

A typesafe SDK for revolut API.

## Install
```sh
$ yarn add revolut-sdk

# or if you have time to spare

$ npm install revolut-sdk
```

## Usage

```js
import Revolut from 'revolut-sdk';
const revolut = new Revolut({
  sandbox: true,
  apiKey: 'your-api-key'
});
```

The SDK uses [`Either`](https://github.com/gcanti/fp-ts/blob/master/src/Either.ts) and [`Option`](https://github.com/gcanti/fp-ts/blob/master/src/Option.ts) to model the result returned from API.


#### Accounts
```js
revolut
  .accounts
  .get(accountId: string): Promise<Either<AxiosError, Option<Account>>>;

revolut
  .accounts
  .getAll(): Promise<Either<AxiosError, Option<Account[]>>>;
```

#### Counterparties

```js
revolut
  .counterparties
  .add(counterparty: Counterparty): Promise<Either<AxiosError, Option<Counterparty>>>;

revolut
  .counterparties
  .getAll(): Promise<Either<AxiosError, Option<Counterparty[]>>>;

revolut
  .counterparties
  .get(counterpartyId: string): Promise<Either<AxiosError, Option<Counterparty>>>;

revolut
  .counterparties
  .del(counterpartyId: string): Promise<Either<AxiosError, Option<any>>>;
```

#### Payments

```js
revolut
  .payments
  .transfer(transfer: TransferData): Promise<Either<AxiosError, Option<Transaction>>>;

revolut
  .payments
  .pay(payment: PaymentData): Promise<Either<AxiosError, Option<Transaction>>>;

revolut
  .payments
  .transactionById(transactionId: string): Promise<Either<AxiosError, Option<Transaction>>>;

revolut
  .payments
  .transactionByRequestId(transactionRequestId: string): Promise<Either<AxiosError, Option<Transaction>>>;

revolut
  .payments
  .cancel(paymentId: string): Promise<Either<AxiosError, Option<any>>>;

revolut
  .payments
  .transactions(transactionsParams?: TransactionParams): Promise<Either<AxiosError, Option<Transaction[]>>>;
```


## Test

```
$ yarn test
```
