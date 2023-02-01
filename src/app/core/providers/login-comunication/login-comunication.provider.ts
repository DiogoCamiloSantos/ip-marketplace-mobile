import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class LoginComunicationProvider {
    private navItemSource: Subject<any> = new Subject();
    public navItem$: Observable<any> = this.navItemSource.asObservable();

    constructor() {
    }

    public start() {
        if (this.navItemSource.closed) {
            this.navItemSource = new Subject();
            this.navItem$ = this.navItemSource.asObservable();
        }
    }

    public error(callback?: Function) {
        this.navItemSource.next({
            error: true,
            callback: callback
        });
    }


    public success(callback?: Function) {
        this.navItemSource.next({
            success: true,
            callback: callback
        });
    }

    public loading() {
        this.navItemSource.next({
            loading: true
        });
    }

    public done() {
        this.navItemSource.next({
            done: true
        });
    }

    public complete() {
        this.navItemSource.complete();
    }
}
