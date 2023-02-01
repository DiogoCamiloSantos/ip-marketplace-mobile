import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { LoadingController, LoadingOptions, NavController } from "@ionic/angular";
import { StorageEnum } from "@models/enum";
import { EnumNamesPage } from "@models/pages";
import { AuthenticationProvider } from "@providers/authentication/authentication";
import { HelperProvider } from "@providers/helper/helper";
import { StorageProvider } from "@providers/storage/storage";
import { WorkspaceRepository } from "@repositories/workspace";
import { WorkspacesService } from "@services/workspaces";
import { debounceTime } from "rxjs/operators";
import { Workspace } from 'src/app/core/db/sqlite/typeorm/entity/Workspace';
import { CONFIG } from "src/app/core/values/config";


@Component({
  selector: 'app-workspaces',
  templateUrl: './workspaces.page.html',
  styleUrls: ['./workspaces.page.scss'],
})
export class WorkspacesPage implements OnInit {
  public workspaces: Workspace[] = [];
  public workspacesCopy: Workspace[] = [];
  public searchForm: FormGroup;
  public loadingSync = false;
  private focusOnEnter: HTMLElement;         
  
  private load: HTMLIonLoadingElement;

  constructor(
    public navCtrl: NavController,
    public storage: StorageProvider,
    private loading: LoadingController,
    private auth: AuthenticationProvider,
    private workspacesService: WorkspacesService,
    private workspaceRepository: WorkspaceRepository
  ) {}  

  async ngOnInit() {
    this.prepareForm();
    this.focusOnEnter = document.getElementById("focusOnEnter");

    this.workspaces = await this.workspaceRepository.getAll();

    if (this.workspaces.length == 0) {
      this.sync();
    }
  }

  async ionViewDidLoad() {
    try {
      this.load = await this.loading.create(<LoadingOptions>{
        content: "Carregando..."
      });

      if (this.workspaces.length > 0) {
        this.load.dismiss().then();
      }
    } catch (e) {
      console.error(e);
    }
  }

  selectWorkspace(item: Workspace) {
    try {
      (<any>window).Keyboard.hide();
    } catch (e) {}

    const workspace = this.storage.get<Workspace>(StorageEnum.WORKSPACE);

    this.storage.del(StorageEnum.STORE);

    this.storage.set(StorageEnum.WORKSPACE, item);

    if (workspace) {
      if (item.user && workspace.id === item.id && this.auth.isLogged) {
        return this.navCtrl.navigateForward(EnumNamesPage.TABS).then();
      } else if (item.user && workspace.id !== item.id) {
        this.storage.set(StorageEnum.AUTH, item.user);
        return this.navCtrl
          .navigateRoot(EnumNamesPage.LOGIN_ALREADY_LOGGED)
          .then();
      }
    } else if (item.user) {
      this.storage.set(StorageEnum.AUTH, item.user);
      return this.navCtrl
        .navigateRoot(EnumNamesPage.LOGIN_ALREADY_LOGGED)
        .then();
    }

    return this.navCtrl.navigateForward(EnumNamesPage.Login).then();
  }

  ionViewDidEnter(): void {
    // (<any>window).Keyboard.show();
    this.focusOnEnter.focus();
  }

  ionViewDidLeave(): void {
    this.load.dismiss();
  }

  public async sync() {
    const loadingAlert = this.loading.create({ message: "Carregando" });
    (await loadingAlert).present();

    await this.workspacesService.go().toPromise();
    await this.workspacesService.saveInStorage();

    try {
      await this.workspaceRepository.updateDeleteByIds(
        CONFIG.allowed_workspaces
      );
    } catch (e) {
      console.error(e);
    }

    const workspaces = await this.workspaceRepository.getAll();

    workspaces.sort((a: Workspace, b: Workspace) => {
      return a.active === b.active ? 0 : a.active ? -1 : 1;
    });

    this.workspaces = workspaces;

    (await loadingAlert).dismiss();
  }

  private prepareForm() {
    this.searchForm = new FormGroup({
      search: new FormControl()
    });

    this.searchForm
      .get("search")
      .valueChanges.pipe(debounceTime(150))
      .subscribe(this.filterWorkspaces.bind(this));
  }

  private filterWorkspaces(text: string) {
    if (this.workspacesCopy.length === 0) {
      this.workspacesCopy = HelperProvider.copy(this.workspaces);
    }

    this.workspaces = this.workspacesCopy
      .filter(value => value.name.like(text))
      .sort((a: Workspace, b: Workspace) => (a.id > b.id ? 1 : 0));
  }
}
