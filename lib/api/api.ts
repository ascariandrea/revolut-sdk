import {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios'
import { Either, left, right } from 'fp-ts/lib/Either'
import { fromNullable, Option } from 'fp-ts/lib/Option'

export default class API {
  constructor(private client: AxiosInstance) {}

  protected fetch = <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Either<AxiosError, Option<T>>> => {
    return this.handleError<T>(this.client.get<T>(url, config))
  }

  protected post = <T>(
    url: string,
    data?: object
  ): Promise<Either<AxiosError, Option<T>>> =>
    this.handleError<T>(this.client.post<T>(url, data))

  protected put = <T>(
    url: string,
    data?: any,
    axiosReqConfig?: AxiosRequestConfig
  ): Promise<Either<AxiosError, Option<T>>> => {
    return this.handleError<T>(this.client.put<T>(url, data, axiosReqConfig))
  }

  protected delete = (
    url: string,
    axiosReqConfig?: AxiosRequestConfig
  ): Promise<Either<AxiosError, Option<any>>> => {
    return this.handleError(this.client.delete(url, axiosReqConfig))
  }

  private success = <T>(res: AxiosResponse<T>): Either<AxiosError, T> =>
    right(res.data)

  private error = <T>(err: AxiosError): Either<AxiosError, T> => left(err)

  private handleError = <T>(
    promise: AxiosPromise<T>
  ): Promise<Either<AxiosError, Option<T>>> =>
    promise
      .then(this.success)
      .catch(err => this.error<T>(err))
      .then(result => result.map(v => fromNullable(v)))
}
