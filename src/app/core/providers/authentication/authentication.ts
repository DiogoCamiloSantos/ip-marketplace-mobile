import {Injectable} from '@angular/core';
import {User} from '@dbentities/User';
import {Workspace} from '@dbentities/Workspace';
import { AlertController, ModalController, IonApp, NavController } from '@ionic/angular';
import {StorageEnum} from '@models/enum';
import {EnumNamesPage} from '@models/pages';
import { StorageProvider } from '@providers/storage/storage';

@Injectable()
export class AuthenticationProvider {
    constructor(
        public modalCtrl: ModalController,
        private storage: StorageProvider,
        public navCtrl: NavController,
        public alertCtrl: AlertController
    ) {
    }

    get workspace(): Workspace {
        return this.storage.get<Workspace>(StorageEnum.WORKSPACE);
    }

    set workspace(item: Workspace) {
        this.storage.set<Workspace>(StorageEnum.WORKSPACE, item);
    }

    get name(): string {
        return this.user.name;
    }

    get descricaoPerfil(): string {
        return this.user.descricaoPerfil;
    }

    get userId(): string {
        return this.user.userId;
    }

    get token(): string {
        return this.user.last_token;
    }

    set token(value: string) {
        const user = this.user;
        user.last_token = value;
        this.storage.set<User>(StorageEnum.AUTH, user);
    }

    get setor(): string {
        return this.user.setor;
    }

    set setor(value: string) {
        const user = this.user;
        user.setor = value;
        this.storage.set<User>(StorageEnum.AUTH, user);
    }

    get expires(): Date {
        return this.user.expires_in;
    }

    set expires(value: Date) {
        const user = this.user;
        user.expires_in = value;
        this.storage.set<User>(StorageEnum.AUTH, user);
    }

    get user(): User {
        return this.storage.get<User>(StorageEnum.AUTH);
    }

    get isLogged(): boolean {
        return this.storage.has(StorageEnum.AUTH);
    }

    get isValid(): boolean {
        try {
            const expires = new Date(this.user.expires_in);
            return expires > new Date();
        } catch (e) {
            return false;
        }
    }

    get exist() {
        return !!this.user;
    }

    get userLoggedIsLoja(): boolean {
        return this.user.perfil.toLocaleLowerCase() === 'loja';
    }

    get userLoggedIsRepresentante(): boolean {
        return this.user.perfil.toLocaleLowerCase() === 'representante';
    }

    get userPerfl(): string {
        return this.user.perfil;
    }

    get keySyncSearch() {
        return `${this.user.id}-${this.workspace.id}-${StorageEnum.SYNC}`;
    }

    delete(): void {
        this.storage.del(StorageEnum.AUTH);
    }

    async signOut(goToLogin = false) {
        this.storage.del(StorageEnum.STORE);
        this.storage.del(StorageEnum.STORE_DETAILS);
        this.storage.del(StorageEnum.AUTH);

        this.workspace = {
            ...this.workspace,
            user: null
        };

        if (goToLogin) {
            await this.navCtrl.navigateRoot(EnumNamesPage.Login);
        } else {
            await this.showLoginPage();
        }
    }

    public async showLoginPage() {
        const confirm = this.alertCtrl.create({
            header: 'Atenção',
            message: 'Suas credenciais expiraram. Por favor, logue novamente!',
            buttons: [
                {
                    text: 'Vamos lá!',
                    // handler: this.showModalLogin.bind(this)
                }
            ]
        });

        await confirm.then();
    }

    // showModalLogin() {
    //     const modal = this.modalCtrl.create(EnumNamesPage.LOGIN_PAGE, {
    //         fromModal: true,
    //         noClose: true
    //     });

    //     modal.present().then();

    //     modal.onDidDismiss(async data => {
    //         //console.log('refreshedLogin', data);

    //         if (data && data.refreshedLogin) {
    //             const confirm = this.alertCtrl.create({
    //                 title: 'Parabéns',
    //                 message: 'Você esta logado novamente!',
    //                 buttons: ['Entendi :)']
    //             });

    //             await confirm.present();
    //         }
    //     });
    // }
}
