import axios, { AxiosInstance } from 'axios';
import counterparties from './counterparties';

const API_VERSION = 1.0;

export default class RevolutClient {

  static get SANDBOX_URL() { return `https://sandbox-b2b.revolut.com/api/${API_VERSION}`; }
  static get PRODUCTION_URL() { return `https://b2b.revolut.com/api/${API_VERSION}`; }

  public config: RevolutSDK.Config;
  public client: AxiosInstance;

  constructor(config: RevolutSDK.Config) {
    this.client = axios.create({
      baseURL: config.sandbox ? RevolutClient.SANDBOX_URL : RevolutClient.PRODUCTION_URL,
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
    });
    return this;
  }

  get counterparties() { return counterparties(this.client); }

}
