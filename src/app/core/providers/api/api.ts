import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { resolve } from 'url';
import { CONFIG } from '../../values/config';
import { AuthenticationProvider } from '../authentication/authentication';


@Injectable()
export class ApiProvider {
    constructor(
        private http: HttpClient,
        private auth: AuthenticationProvider
    ) {
    }

    public login<T>(data: T): Observable<any> {
        const headers = new HttpHeaders()
            .set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(this.auth.workspace.token, data, {
            headers: headers
        });
    }

    public post<T>(url: string, data: T): Observable<any> {
        const self = this;
        return self.http.post<T>(this.joinUris(url), data);
    }

    public get<T>(url: string): Observable<any> {
        const self = this;
        return self.http.get<T>(this.joinUris(url));
    }

    public getAll<T>(uris: string[]): Observable<T[]> {
        const self = this;
        return forkJoin(uris.map(function (uri) {
            return self.get(uri);
        }));
    }

    public postAll<T>(uris: string[], datas: any[]): Observable<any[]> {
        const self = this;
        return forkJoin(uris.map((uri, idx) => {
            return self.post<T>(uri, datas[idx]);
        }));
    }

    public syncApi<T>(data: T, url: string = null, method: API_METHODS = API_METHODS.POST): Observable<any>{
      
        if (!url && method === API_METHODS.GET) {
            url =   `assets/workspaces/${CONFIG.prod ? 'prod' : 'dev'}.json`;            
        }

        if (method === API_METHODS.POST) {
            return this.http.post<T>(url, data);

        } else {
            return this.http.get<T>(url);
        }​​​​​
    }​​​​​

    public syncApiAll<T>(data: T[], uri: string = null, method: API_METHODS = API_METHODS.POST): Observable<T[]> {
        const self = this;
        return forkJoin(data.map((data) => {
            return self.syncApi<T>(data, uri, method);
        }));
    }

    private joinUris(...fragments) {
        let uriStart = this.auth.workspace.link;
       

        return uriStart;
    }

    public prepareUrl(complement: string): string {
        const endpoint = `${this.getCurrentEnvironmentUrl()}${complement}`;

        return endpoint;
    }

    private getCurrentEnvironmentUrl(): string {
        // const url = `http://marketplace.ecs.com.br/`;
        const url =  this.auth.workspace.link;
        return url;
    }
}


export enum API_METHODS {
    POST = 1,
    GET = 2,
    DELETE = 3,
    PUT = 4,
}