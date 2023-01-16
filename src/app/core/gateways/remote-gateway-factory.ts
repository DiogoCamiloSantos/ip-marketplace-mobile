import { Injectable } from '@angular/core';
import { RemoteGateway } from './remote.gateway';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RemoteGatewayFactory {

    constructor(
        private httpClient: HttpClient) {
    }

    createDefaultRemoteGateway(): RemoteGateway {
        return new RemoteGateway('', this.httpClient);
    }

    createRemoteGateway(backEndUrl: string): RemoteGateway {
        return new RemoteGateway(backEndUrl, this.httpClient);
    }
}