import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export interface IApiService {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => AxiosPromise<T>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ) => AxiosPromise<T>;
  put: <T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ) => AxiosPromise<T>;
  patch: <T = any>(
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ) => AxiosPromise<T>;
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ) => AxiosPromise<T>;
}

axios.defaults.withCredentials = true;

const HttpService: IApiService = {
  get(url, config) {
    return axios.get(url, config);
  },
  post(url, data, config) {
    return axios.post(url, data, config);
  },
  put(url, data, config) {
    return axios.put(url, data, config);
  },
  patch(url, data, config) {
    return axios.patch(url, data, config);
  },
  delete(url, config) {
    return axios.delete(url, config);
  },
};

export default HttpService;
