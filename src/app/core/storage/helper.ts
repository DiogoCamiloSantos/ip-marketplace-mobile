import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Observable, of } from 'rxjs';
@Injectable()
export class HelperProvider {
    constructor() {
    }

    public static when(args?: any): Observable<any> {
        return of(args);
    }

    public static capitalize(name: string): string {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    public static copy(obj: string): any {
        return JSON.parse(JSON.stringify(obj));
    }

    public static markAsTouched(formObject: FormGroup) {
        for (const eachControl in formObject.controls) {
            if (formObject.controls.hasOwnProperty(eachControl)) {
                (<FormControl>formObject.controls[eachControl]).markAsTouched();
            }
        }
    }

    public static tryParse(jsonString: string) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            return null;
        }
    }
}

