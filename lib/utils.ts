import {AxiosResponse} from 'axios';

export const responseSerializer = {
  get: (res: AxiosResponse<RevolutSDK.CounterParty>) => res.data,
  del: (res: AxiosResponse<boolean>) => res.status === 204,
};
