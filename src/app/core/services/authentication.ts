// import {Injectable} from '@angular/core';
// import { AlertController, ModalController } from '@ionic/angular';
// import { Workspace } from '../models/Workspace';
// import {StorageProvider} from '../storage/storage';
// import { StorageEnum } from '../types/enum';
// import { EnumNamesPage } from '../types/pages';

// @Injectable()
// export class AuthenticationProvider {
//     constructor(
//         public modalCtrl: ModalController,
//         private storage: StorageProvider,
//         public alertCtrl: AlertController
//     ) {
//     }

//     get workspace(): Workspace {
//         return this.storage.get<Workspace>(StorageEnum.WORKSPACE);
//     }

//     set workspace(item: Workspace) {
//         this.storage.set<Workspace>(StorageEnum.WORKSPACE, item);
//     }

//     get name(): string {
//         return this.user.name;
//     }

//     get descricaoPerfil(): string {
//         return this.user.descricaoPerfil;
//     }

//     get userId(): string {
//         return this.user.userId;
//     }

//     get token(): string {
//         return this.user.last_token;
//     }

//     set token(value: string) {
//         const user = this.user;
//         user.last_token = value;
//         this.storage.set<User>(StorageEnum.AUTH, user);
//     }

//     get setor(): string {
//         return this.user.setor;
//     }

//     set setor(value: string) {
//         const user = this.user;
//         user.setor = value;
//         this.storage.set<User>(StorageEnum.AUTH, user);
//     }

//     get expires(): Date {
//         return this.user.expires_in;
//     }

//     set expires(value: Date) {
//         const user = this.user;
//         user.expires_in = value;
//         this.storage.set<User>(StorageEnum.AUTH, user);
//     }

//     get user(): User {
//         return this.storage.get<User>(StorageEnum.AUTH);
//     }

//     get isLogged(): boolean {
//         return this.storage.has(StorageEnum.AUTH);
//     }

//     get isValid(): boolean {
//         try {
//             const expires = new Date(this.user.expires_in);
//             return expires > new Date();
//         } catch (e) {
//             return false;
//         }
//     }

//     get exist() {
//         return !!this.user;
//     }

//     get userLoggedIsLoja(): boolean {
//         return this.user.perfil.toLocaleLowerCase() === 'loja';
//     }

//     get userLoggedIsRepresentante(): boolean {
//         return this.user.perfil.toLocaleLowerCase() === 'representante';
//     }

//     get userPerfl(): string {
//         return this.user.perfil;
//     }

//     get keySyncSearch() {
//         return `${this.user.id}-${this.workspace.id}-${StorageEnum.SYNC}`;
//     }

//     delete(): void {
//         this.storage.del(StorageEnum.AUTH);
//     }

//     async signOut(goToLogin = false) {
//         this.storage.del(StorageEnum.STORE);
//         this.storage.del(StorageEnum.STORE_DETAILS);
//         this.storage.del(StorageEnum.AUTH);

//         this.workspace = {
//             ...this.workspace,
//             user: null
//         };

//         if (goToLogin) {
//             // await this.app.getRootNav().setRoot(EnumNamesPage.LOGIN_PAGE);
//         } else {
//             await this.showLoginPage();
//         }
//     }

//     public async showLoginPage() {
//         // const confirm = this.alertCtrl.create({
//         //     title: 'Atenção',
//         //     message: 'Suas credenciais expiraram. Por favor, logue novamente!',
//         //     buttons: [
//         //         {
//         //             text: 'Vamos lá!',
//         //             handler: this.showModalLogin.bind(this)
//         //         }
//         //     ]
//         // });

//         // await confirm.present();
//     }
// }
