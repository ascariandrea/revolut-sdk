import { AxiosResponse } from 'axios'

export const responseSerializer = {
  get: <T>(res: AxiosResponse<T>) => res.data,
  del: (res: AxiosResponse<boolean>) => res.status === 204
}
