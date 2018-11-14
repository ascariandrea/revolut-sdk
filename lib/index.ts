import axios, { AxiosInstance } from 'axios'
import { compose } from 'fp-ts/lib/function'
import { asks, Reader } from 'fp-ts/lib/Reader'
import Accounts from './api/accounts'
import Counterparties from './api/counterparties'
import Payments from './api/payments'
import { Config, OptionalConfig, RevolutClientConfig } from './config'

const API_VERSION = '1.0'

const defaultConfig: OptionalConfig = {
  apiVersion: API_VERSION,
  sandbox: false
}

export const getBaseURL = (config: Config) =>
  `https://${config.sandbox ? 'sandbox-b2b' : 'b2b'}.revolut.com/api/${
    config.apiVersion
  }`

const getAxiosInstance = (config: Config) =>
  axios.create({
    baseURL: getBaseURL(config),
    headers: {
      Authorization: `Bearer ${config.apiKey}`
    }
  })

const getRevolutClient = (client: AxiosInstance): RevolutClient => ({
  accounts: new Accounts(client),
  counterparties: new Counterparties(client),
  payments: new Payments(client)
})

const applyDefault = (config: RevolutClientConfig): Config => ({
  ...defaultConfig,
  ...config
})

interface RevolutClient {
  accounts: Accounts
  counterparties: Counterparties
  payments: Payments
}

const RevolutClient: Reader<RevolutClientConfig, RevolutClient> = asks<
  RevolutClientConfig,
  Config
>(applyDefault).map(compose(getRevolutClient, getAxiosInstance))

export { RevolutClient }
