import { AxiosInstance } from 'axios'

export default class API {
  protected client: AxiosInstance

  constructor(client: AxiosInstance) {
    this.client = client
  }
}
