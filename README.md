# Revolut SDK
---
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

## Test

```
$ yarn test
```
