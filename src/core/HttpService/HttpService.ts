import axios from 'axios';
import { template } from 'lodash';

import { apiMap } from './apiMap';
import { HttpRequestCfg } from './http.interface';
import { dispatch } from '@redux/store';
import { incrementBusyCounter, decrementBusyCounter, addError } from '@redux/config';

class HttpService {
  /**
   * Creates an HTTP request. Has automatic error-handling and busy-indicator-handling.
   */
  api<T>(cfg: HttpRequestCfg): Promise<T> {
    const promise = new Promise((resolve, reject) => {
      if (!cfg.disableBI) {
        dispatch(incrementBusyCounter());
      }

      axios({
        url: this.getUrl(cfg),
        data: cfg.data,
        method: apiMap[cfg.type].method
      }).then(
        res => {
          if (!cfg.disableBI) {
            dispatch(decrementBusyCounter());
          }
          resolve(res.data);
        },
        err => {
          if (!cfg.disableBI) {
            dispatch(decrementBusyCounter());
          }

          reject(err);
          dispatch(addError('Something went wrong...'));
        }
      );
    }) as Promise<T>;

    return promise;
  }

  private getUrl(cfg: HttpRequestCfg) {
    const url = apiMap[cfg.type].url;

    return template(url)(cfg.urlParams);
  }
}

export const httpService = new HttpService();
