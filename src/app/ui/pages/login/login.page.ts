import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AlertController, LoadingController, NavController, NavParams } from "@ionic/angular";
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { ViewController } from "@ionic/core";
import { StorageEnum } from "@models/enum";
import { ILogin, Login, LoginResponse, WorkspaceUserSync } from "@models/login";
import { EnumNamesPage } from "@models/pages";
import { AuthenticationProvider } from "@providers/authentication/authentication";
import { HelperProvider } from "@providers/helper/helper";
import { LoginComunicationProvider } from "@providers/login-comunication/login-comunication.provider";
import { StorageProvider } from "@providers/storage/storage";
import { ThemeProvider } from "@providers/theme/theme";
import { LoginRepository } from "@repositories/login";
import { LoginService } from "@services/login";
import { LoginRulesService } from "@services/login-rules";
import { CONFIG } from "src/app/core/values/config";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loginModel: ILogin = new Login();
  public passwordType: string = "password";
  public passwordIcon: string = "eye-off";
  public loadingAlert: Promise<HTMLIonLoadingElement> = null;
  public status: boolean = false;
  public fromModal: boolean = false;
  public noClose: boolean = false;
  public version: any;
  public workspaceName: any;
  public isProdConfig: boolean = false;

  constructor(
    private appVersion: AppVersion,
    private navCtrl: NavController,
    private storage: StorageProvider,
    private alert: AlertController,
    private loading: LoadingController,
    private com: LoginComunicationProvider,
    private themeProvider: ThemeProvider,
    private auth: AuthenticationProvider,
    private loginService: LoginService,
    private loginRepository: LoginRepository,
    private rulesService: LoginRulesService,
    private navParams: NavParams
  ) {
    this.buildForm();
  }

  async ngOnInit() {
  }
  
  async ionViewDidEnter() {
    this.com.start();
    
    this.status = true;
    
    this.fromModal = this.navParams.get("fromModal") || false;
    this.noClose = this.navParams.get("noClose") || false;
    
    if (CONFIG.prod)
    this.isProdConfig = true;
    
    this.version = await this.appVersion.getVersionNumber();
    this.workspaceName = this.auth.workspace.name;

    this.loadingAlert = this.loading.create({ message: "Carregando" });
    const load = await this.loadingAlert.then();

    this.themeProvider.checkAndSetTheme().then(
      () => load.present(),
      () => {

        return this.alert
          .create({
            header: "Ops",
            message: "Problema desconhecido ao tentar sincronizar o tema",
            buttons: [
              {
                text: "Tentar novamente",
                handler: () => {
                  this.ionViewDidEnter();
                }
              },
              {
                text: "Cancelar",
                handler: () => {
                  return this.navCtrl.navigateRoot(EnumNamesPage.TABS)
                    .then();
                }
              }
            ]
          })
          .then();
      }
    ).finally(() => load.dismiss());
  }

  async ionViewDidLeave() {
    this.com.done();
    this.status = false;
    this.loadingAlert && (await this.loadingAlert).dismiss();
  }

  public async login(): Promise<void> {
    // if (this.network.type === "none") {
    //   const alert = this.alert.create({
    //     header: "Atenção",
    //     message: "Conecte-se a uma rede, você está offline.",
    //     buttons: ["Entendi"]
    //   });
    //   return alert.then();
    // }

    if (!this.loginForm.valid) {
      const alert = this.alert.create({
        header: "Atenção",
        message: "Preencha os campos obrigatórios!",
        buttons: ["Entendi"]
      });

      HelperProvider.markAsTouched(this.loginForm);

       alert.then();
    }

    this.loginForm.disable();

    this.com.loading();

    const values = this.loginForm.value;

    this.loginService.login(values.user, values.password).subscribe(
      (res: LoginResponse) => {
        this.com.success(() => this.finishLogin(res, values));
        this.loginForm.enable();
      },
      err => {
        const error = err.error || {};
        this.loginForm.enable();

        this.com.error(() => {
          const alert = this.alert.create({
            header: "Atenção",
            message: error.error_description || "Usuário ou senha inválidos!",
            buttons: ["Entendi"]
          });
           alert.then();
        });
      }
    );
  }

  public goToWorkspace() {
    this.storage.del(StorageEnum.WORKSPACE);
    this.navCtrl.navigateBack(EnumNamesPage.Workspaces).then();
  }

  public async finishLogin(res, values) {
    const userWorkspaceSaved = await this.loginRepository.saveUserWorkspace(
      res,
      values.password,
      values.user
    );

    const workspaceUserSet = <WorkspaceUserSync>{
      workspaceId: userWorkspaceSaved.workspaceId,
      userId: userWorkspaceSaved.userId,
      date: null,
      sync: false
    };

    this.rulesService
      .saveUserSync(workspaceUserSet)
      .then((res: boolean) => {
        if (res) {
          return this.navCtrl.navigateForward(EnumNamesPage.Home).then();
        }

        if (!this.fromModal) {
          return this.navCtrl.navigateRoot(EnumNamesPage.Home).then();
        }
        
        return this.navCtrl.navigateRoot(EnumNamesPage.Home).then()
        // if (this.fromModal) {
        //   // return this.viewCtrl
        //   //   .dismiss({
        //   //     refreshedLogin: true
        //   //   })
        //   //   .then();
        // }
      })
      .catch(err => console.log(err));
  }

  public forgetPassword(): void {
    if (!this.loginForm.controls['user'].valid) {
      const alert = this.alert.create({
        header: "Atenção",
        message: "Preencha com o seu usuário.",
        buttons: ["Ok"]
      });

      alert.then();
    }

    const loading = this.loading.create();

    this.loginService
      .forgetPassword(
        this.loginForm.controls['user'].value,
        this.auth.workspace.token
      )
      .subscribe(
        () => {
          loading.then((alert) => alert.dismiss());

          const alert = this.alert.create({
            header: "Sucesso",
            message:
              "Enviamos informações para você resetar a sua senha para o seu email.",
            buttons: ["Ok"]
          });

          return alert.then();
        },
        () => {
          loading.then((alert) => alert.dismiss());

          const alert = this.alert.create({
            header: "Erro",
            message: "Ocorreu algum erro ao resetar a sua senha.",
            buttons: ["Ok"]
          });

          return alert.then();
        }
      );
  }

  public hideShowPassword() {
    this.passwordType = this.passwordType === "text" ? "password" : "text";
    this.passwordIcon = this.passwordIcon === "eye-off" ? "eye" : "eye-off";
  }

  private buildForm() {
    this.loginForm = new FormGroup({
      user: new FormControl(this.loginModel.user, [
        Validators.required,
        Validators.minLength(2)
      ]),
      password: new FormControl(this.loginModel.password, [
        Validators.required,
        Validators.minLength(2)
      ])
    });
  }

  // public closeModal() {
  //   return this.viewCtrl
  //     .dismiss({
  //       refreshedLogin: false
  //     })
  //     .then();
  // }

}
