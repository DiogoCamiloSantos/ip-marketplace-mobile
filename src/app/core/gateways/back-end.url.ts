import { Url } from './url';

export class BackendUrl extends Url {
    constructor (private action: string) {
        super(action);
    }

    override getUrl() : string {
        return "https://rqdteclhn8.execute-api.us-east-2.amazonaws.com/mkt/dev/app/sync" + this.action;
    }

    getEndpoint() : string {
        return this.action;
    }
}