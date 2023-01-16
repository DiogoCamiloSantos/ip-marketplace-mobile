// import { Injectable } from '@angular/core';
// import { StorageEnum } from '../types/enum';
// import { WorkspaceUserSync } from '../types/workspace-user-sync';
// import { HelperProvider } from './helper';

// @Injectable()
// export class StorageProvider {
//     private readonly prefix: string;

//     constructor() {
//         this.prefix = 'MktMobile';
//     }

//     public get<T>(storage: StorageEnum, type: string = 'localStorage'): T {
//         return HelperProvider.tryParse(window[type].getItem(`${this.prefix}.${storage}`));
//     }

//     public has(storage: StorageEnum | string, type: string = 'localStorage'): boolean {
//         return !!window[(type)].getItem(`${this.prefix}.${storage}`);
//     }

//     public set<T>(storage: StorageEnum, data: T, type: string = 'localStorage'): void {
//         window[type].setItem(`${this.prefix}.${storage}`, JSON.stringify(data));
//     }

//     public getSync<T>(key: string, type: string = 'localStorage'): T {
//         return HelperProvider.tryParse(window[type].getItem(`${this.prefix}.${key}`));
//     }

//     public setSync(key: string, data: WorkspaceUserSync, type: string = 'localStorage'): void {
//         window[type].setItem(`${this.prefix}.${key}`, JSON.stringify(data));
//     }

//     public delSync(key: string, type: string = 'localStorage'): void {
//         window[type].removeItem(`${this.prefix}.${key}`);
//     }

//     public del(storage: StorageEnum, type: string = 'localStorage'): void {
//         window[type].removeItem(`${this.prefix}.${storage}`);
//     }

//     public clear(keysIgnore?: string[], type: string = 'localStorage'): void {
//         keysIgnore = (keysIgnore || []).map((key) => `${this.prefix}.${key}`);

//         Object.keys(window[type])
//             .map(function (chave) {
//                 if (keysIgnore && keysIgnore.indexOf(chave) === -1) {
//                     window[type].removeItem(chave);
//                 }
//             });
//     }
// }
