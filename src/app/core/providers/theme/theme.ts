import { Injectable } from "@angular/core";
import { Theme } from "@dbentities/Theme";
import { Workspace } from "@dbentities/Workspace";
import { StorageEnum } from "@models/enum";
import { StackSyncErrorsEnum } from "@models/erros";
import { Tema } from "@models/tema";
import { ApiProvider } from "@providers/api/api";
import { from, of, take, throwError } from "rxjs";
import { catchError, concatMap, map } from "rxjs/operators";
import { DataSource } from "typeorm";
import { OrmProvider } from "../../db/sqlite/typeorm/orm/orm";
import { StorageProvider } from "../storage/storage";
import { StatusBar, Style } from '@capacitor/status-bar';
import { Default } from "../../values/theme.template";

@Injectable()
export class ThemeProvider {
  private connection: DataSource = null;
  private workspaceActive: Workspace = null;
  private newTheme: Theme = null;

  constructor(
    private api: ApiProvider,
    private storage: StorageProvider,
    private orm: OrmProvider,
  ) {}

  get self() {
    return this;
  }

  public go() {
    try {
      return this.checkAndSetThemeSync();
    } catch (e) {
      return of(throwError(StackSyncErrorsEnum.THEME_NOT_NOW));
    }
  }

  async checkAndSetTheme(): Promise<boolean> {
    try {
      const con = await this.orm.getConnection();
      const workspaceStorage: any = this.storage.get(StorageEnum.WORKSPACE);
      const workspaceRepository = con.getRepository(Workspace);
      const workspace: Workspace = await workspaceRepository.findOne({
        where: {
          id: workspaceStorage.id
        },
        relations: ["theme"]
      });

      if (!workspace.theme) {
        // if (this.network.type === "none") {
        //   return false;
        // }

        const res: Tema[] = await this.api
          .get("temas")
          .pipe(take(1))
          .toPromise();

        const tema: Tema = res.find(tema => tema.Status);

        const newTheme = new Theme();
        newTheme.name = tema.Descricao;
        newTheme.colorA = tema.paletaCorA;
        newTheme.colorB = tema.paletaCorB;
        newTheme.colorC = tema.paletaCorC;
        newTheme.colorD = tema.paletaCorD;
        newTheme.colorFont = tema.paletaCorFonteMenu;

        await con.manager.save(newTheme);
        workspace.theme = newTheme;
        await con.manager.save(workspace);

        this.storage.set(StorageEnum.WORKSPACE, workspace);
        this.setTheme();
      } else {
        this.storage.set(StorageEnum.WORKSPACE, workspace);
        this.setTheme();
      }

      return true;
    } catch (e) {
      throw e;
    }
  }

  private async getActiveWorkspace() {
    try {
      if (!this.connection) {
        await this.initCon();
      }
      const workspaceStorage: any = this.storage.get(StorageEnum.WORKSPACE);
      const workspaceRepository = this.connection.getRepository(Workspace);
      const workspace: Workspace = await workspaceRepository.findOne({
        where: {
          id: workspaceStorage.id
        },
        relations: ["theme"]
      });
      return workspace;
    } catch (e) {
      return of(
        throwError(StackSyncErrorsEnum.THEME_RETRIEVE)
      );
    }
  }

  public checkAndSetThemeSync() {
    return from(this.getActiveWorkspace()).pipe(
      take(1),
      concatMap(res => {
        this.workspaceActive = <Workspace>res;
        return this.api.get("temas").pipe(take(1));
      }),
      map((res: Tema[]) => {
        const tema: Tema = res.find(tema => tema.Status);

        this.newTheme = this.workspaceActive.theme
          ? this.workspaceActive.theme
          : new Theme();
        this.newTheme.name = tema.Descricao;
        this.newTheme.colorA = tema.paletaCorA;
        this.newTheme.colorB = tema.paletaCorB;
        this.newTheme.colorC = tema.paletaCorC;
        this.newTheme.colorD = tema.paletaCorD;
        this.newTheme.colorFont = tema.paletaCorFonteMenu;

        return res;
      }),
      catchError(e => {
        //console.log(e);
        return of(
          throwError(StackSyncErrorsEnum.THEME_RETRIEVE)
        );
      })
    );
  }

  setTheme() {
    const workspace: Workspace = this.storage.get(StorageEnum.WORKSPACE);

    if (workspace && workspace.theme) {
      // set color status bar
      StatusBar.setOverlaysWebView({ overlay: false });
      StatusBar.setBackgroundColor({ color: workspace.theme.colorA });
      // set theme color
      const css = Default(
        workspace.theme.colorA,
        workspace.theme.colorB,
        workspace.theme.colorC,
        workspace.theme.colorD,
        workspace.theme.colorFont
      );
      const head = document.getElementsByTagName("head")[0];
      const style = document.createElement("style");
      style.type = "text/css";
      style.appendChild(document.createTextNode(css));
      head.appendChild(style);
    }
  }

  public async saveInStorage() {
    if (!this.connection) {
      await this.initCon();
    }
    await this.connection.manager.save(this.newTheme);
    this.workspaceActive.theme = this.newTheme;
    await this.connection.manager.save(this.workspaceActive);
    this.storage.set(StorageEnum.WORKSPACE, this.workspaceActive);
    this.setTheme();
  }

  private async initCon() {
    if (!this.connection) {
      this.connection = await this.orm.getConnection();
    }
  }
}
