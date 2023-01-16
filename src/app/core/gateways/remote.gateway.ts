import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Url } from './url';

export class RemoteGateway {

  constructor(
    private backendUrl: string,
    private httpClient: HttpClient) {
  }

  postWithHeaders(url: Url, payload: any, headers: any) {
    return new Promise((resolve, reject) => {
      this.httpClient.post(url.getUrl(), payload, { headers })
        .toPromise()
        .then(r => {
          resolve(r);
        })
        .catch((response: HttpErrorResponse) => {
          reject(response);
        });
    });
  }

  download(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.buildUrl(url), { responseType: 'blob' as 'json' })
        .toPromise()
        .then(r => {
          resolve(r);
        })
        .catch((response: HttpErrorResponse) => {
          reject(response);
        });
    });
  }

  downloadAsPost(url: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.buildUrl(url), payload, { responseType: 'blob' })
        .toPromise()
        .then(r => {
          resolve(r);
        })
        .catch((response: HttpErrorResponse) => {
          reject(response);
        });
    });
  }

  get(url: Url): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url.getUrl())
        .toPromise()
        .then(r => {
          resolve(r);
        })
        .catch((response: HttpErrorResponse) => {
          reject(response);
        });
    });
  }

  getWithHeaders(url: Url, headers: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get(url.getUrl(), { headers })
        .toPromise()
        .then(r => {
          resolve(r);
        })
        .catch((response: HttpErrorResponse) => {
          reject(response);
        });
    });
  }

  post(url: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.post(this.buildUrl(url), payload)
        .toPromise()
        .then(r => {
          resolve(r);
        })
        .catch((response: HttpErrorResponse) => {
          reject(response);
        });
    });
  }

  put(url: string, payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.put(this.buildUrl(url), payload)
        .toPromise()
        .then(r => {
          resolve(r);
        })
        .catch((response: HttpErrorResponse) => {
          reject(response);
        });
    });
  }

  delete(url: string) {
    return new Promise((resolve, reject) => {

      this.httpClient.delete(this.buildUrl(url))
        .toPromise()
        .then(r => {
          resolve(r);
        })
        .catch(response => {
          reject(response);
        });
    });
  }

  private buildUrl(action: string) {
    if (action.startsWith('https') || action.startsWith('http')) {
      return action;
    }
    if (!!action && action.charAt(0) !== '/') {
      action = `/${action}`;
    }
    return `${this.backendUrl}${action}`;
  }
}
