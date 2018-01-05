import axios, { AxiosInstance } from 'axios';
import Accounts from './api/accounts';
import Counterparties from './api/counterparties';
import Payments from './api/payments';
import { Config } from './config';

const API_VERSION = 1.0;

export default class RevolutClient {

  static get SANDBOX_URL() { return `https://sandbox-b2b.revolut.com/api/${API_VERSION}`; }
  static get PRODUCTION_URL() { return `https://b2b.revolut.com/api/${API_VERSION}`; }

  public config: Config;
  public client: AxiosInstance;

  constructor(config: Config) {
    this.client = axios.create({
      baseURL: config.sandbox ? RevolutClient.SANDBOX_URL : RevolutClient.PRODUCTION_URL,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
    });
    return this;
  }
  get accounts() { return new Accounts(this.client); }
  get counterparties() { return new Counterparties(this.client); }
  get payments() { return new Payments(this.client); }
}
