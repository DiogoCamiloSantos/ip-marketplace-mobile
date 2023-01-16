import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { LoadingOptions, NavController } from "@ionic/angular";
import { debounceTime } from "rxjs/operators";
import { db } from "src/app/core/db/db";
import { Workspace } from "src/app/core/models/Workspace";
import { WorkspacesService } from "src/app/core/services/workspaces.service";
import { StorageProvider } from "src/app/core/storage/storage";
import { StorageEnum } from "src/app/core/types/enum";
import { EnumNamesPage } from "src/app/core/types/pages";

@Component({
  templateUrl: "workspace.page.html",
  styleUrls: ["workspace.page.scss"]
})
export class WorkspacePage {
  public workspaces: Workspace[] = [];
 

  constructor(
    public workspacesService: WorkspacesService,
    public storage: StorageProvider,
    public navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.getWorkspaces();
    
    if (this.workspaces.length == 0) {
      this.sync();
    }
  }

  getWorkspaces() {
    this.workspacesService.getAll()
      .then(workspaces => (this.workspaces = workspaces));
  }

  async ionViewDidLoad() {
   
  }

  selectWorkspace(item: Workspace) {
    try {
      (<any>window).Keyboard.hide();
    } catch (e) {}

    const workspace = this.storage.get<Workspace>(StorageEnum.WORKSPACE);

    this.storage.del(StorageEnum.STORE);

    this.storage.set(StorageEnum.WORKSPACE, item);

    if (workspace) {
    //   if (item.user && workspace.id === item.id && this.auth.isLogged) {
    //     return this.navCtrl.push(EnumNamesPage.TABS_PAGE).then();
    //   } else if (item.user && workspace.id !== item.id) {
    //     this.storage.set(StorageEnum.AUTH, item.user);
    //     return this.app
    //       .getRootNav()
    //       .setRoot(EnumNamesPage.LOGIN_ALREADY_LOGGED_PAGE)
    //       .then();
    //   }
    // } else if (item.user) {
    //   this.storage.set(StorageEnum.AUTH, item.user);
    //   return this.app
    //     .getRootNav()
    //     .setRoot(EnumNamesPage.LOGIN_ALREADY_LOGGED_PAGE)
    //     .then();
    }

    return this.navCtrl.navigateForward(EnumNamesPage.LOGIN_PAGE).then();
  }

 

  ionViewDidEnter(): void {
    // (<any>window).Keyboard.show();
  }

  ionViewDidLeave(): void {
  }

  public async sync() {
    await this.workspacesService.sync();
    this.getWorkspaces();
  }
}
