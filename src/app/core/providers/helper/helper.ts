import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@dbentities/Store';
import { AlertController, AlertOptions, Platform } from '@ionic/angular';
import { AlertPresent } from '@models/configs';
import { TipoPedido, TipoPedidoEnum, TipoPedidoStringEnum, TipoPedidoToSend } from '@models/pedido';
import { of, Observable } from 'rxjs';

@Injectable()
export class HelperProvider {
    constructor(public plt: Platform, public alertCtrl: AlertController) {
    }

    public static when(args?: any): Observable<any> {
        return of(args);
    }

    public static capitalize(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }

    public static copy(obj) {
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

    public static adaptarTipoPedido(tipoPedido: TipoPedidoEnum): TipoPedidoStringEnum {
        switch (tipoPedido) {
            case TipoPedidoEnum.ESPECIAL:
                return TipoPedidoStringEnum.ESPECIAL;
            case TipoPedidoEnum.REP:
                return TipoPedidoStringEnum.REP;
            case TipoPedidoEnum.BONIFICADO:
                return TipoPedidoStringEnum.BONIFICADO;
            case TipoPedidoEnum.PADRAO:
                return TipoPedidoStringEnum.PADRAO;
            default:
                return TipoPedidoStringEnum.PADRAO;

        }
    }

    public static adaptarTipoPedidoStr(tipoPedido: TipoPedidoStringEnum): TipoPedidoEnum {
        switch (tipoPedido) {
            case TipoPedidoStringEnum.ESPECIAL:
                return TipoPedidoEnum.ESPECIAL;
            case TipoPedidoStringEnum.REP:
                return TipoPedidoEnum.REP;
            case TipoPedidoStringEnum.BONIFICADO:
                return TipoPedidoEnum.BONIFICADO;
            case TipoPedidoStringEnum.PADRAO:
                return TipoPedidoEnum.PADRAO;
            default:
                return TipoPedidoEnum.PADRAO;
        }
    }

    public static adaptarTipoPedidoModel(tipoPedido: TipoPedidoToSend): TipoPedido {
        const toSend = <TipoPedido>{
            ...tipoPedido
        };

        if (isNaN(+tipoPedido.type)) {
            toSend.type = HelperProvider.adaptarTipoPedidoStr(
                tipoPedido.type as TipoPedidoStringEnum
            );
        }

        return toSend;
    }

    public static mountAddress(store: Store) {
        try {
            let address = `${store.logradouro} ${store.numero}`;

            if (store.complemento) {
                address += ` - ${store.complemento}`;
            }

            address += ` - ${store.cidade} \ ${store.estado}`;

            return address;
        } catch (e) {
            return null;
        }
    }

    public static safeAccess<T>(parentObj: any, accessor: string): T {
        const acessors = accessor.split('.');

        let tempResponse = parentObj;

        for (let i = 0; i < acessors.length; i++) {
            const acessor = acessors[i];
            try {
                tempResponse = tempResponse[acessor];
            } catch (e) {
                return null;
            }
        }

        return tempResponse;
    }

    public static imageExists(image_url): Promise<boolean> {
        if (!image_url) {
            return Promise.resolve(false);
        }

        return new Promise(resolve => {
            const img = new Image();
            img.src = image_url;
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
        });
    }

    public openMap(address) {
        address = encodeURIComponent(address);

        if (this.plt.is('ios')) {
            window.open(`maps:?daddr=${address}`, '_system');
        } else {
            window.open(`geo:?daddr=${address}`, '_system');
        }
    }

    public alertMessage(
        message: string | AlertPresent,
        title?: string,
        buttons?: string[],
        cssClass?: string,
        enableBackdropDismiss?: boolean
    ): Promise<any> {
        let obj: AlertPresent = <AlertPresent>{};
        if (typeof message === 'string') {
            obj = <AlertPresent>{
                title: title,
                message: message,
                buttons: buttons,
                cssClass: cssClass,
                enableBackdropDismiss: enableBackdropDismiss
            };
        } else {
            obj = message;
        }

        return this.alertCtrl
            .create(<AlertOptions>{
                title: obj.title,
                message: obj.message,
                buttons: obj.buttons
            })
            .then();
    }
}

/**
 * Caches the return value of get accessors and methods.
 *
 * Notes:
 * - Doesn't really make sense to put this on a method with parameters.
 * - Creates an obscure non-enumerable property on the instance to store the memoized value.
 * - Could use a WeakMap, but this way has support in old environments.
 */
export function Memoize(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
    if (descriptor.value != null) {
        descriptor.value = getNewFunction(descriptor.value);
    } else if (descriptor.get != null) {
        descriptor.get = getNewFunction(descriptor.get);
    } else {
        throw 'Only put a Memoize decorator on a method or get accessor.';
    }
}

let counter = 0;

function getNewFunction(originalFunction: () => void) {
    const identifier = ++counter;

    return function (this: any, ...args: any[]) {
        const propName = `__memoized_value_${identifier}`;
        let returnedValue: any;

        if (this.hasOwnProperty(propName)) {
            returnedValue = this[propName];
        } else {
            returnedValue = originalFunction.apply(this, args);
            Object.defineProperty(this, propName, {
                configurable: false,
                enumerable: false,
                writable: false,
                value: returnedValue
            });
        }

        return returnedValue;
    };
}

const MEMOIZED_VALUE_KEY = '_memoizedValue';

export function memoize(expirationTimeMs: number = 60000) {
    return (target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) => {
        if (descriptor.value != null) {
            const originalMethod = descriptor.value;
            let fn = function (...args: any[]) {
                if (!fn[MEMOIZED_VALUE_KEY]) {
                    fn[MEMOIZED_VALUE_KEY] = originalMethod.apply(this, args);
                    setTimeout(() => clearMemoizedValue(fn), expirationTimeMs);
                }
                return fn[MEMOIZED_VALUE_KEY];
            };
            descriptor.value = fn;
            return descriptor;
        } else {
            throw 'Only put the @memoize decorator on a method.';
        }
    };
}

export function clearMemoizedValue(method) {
    delete method[MEMOIZED_VALUE_KEY];
}
