import { Injectable } from "@angular/core";
import { Workspace } from "@dbentities/Workspace";
import { StackSyncErrorsEnum } from "@models/erros";
import { ApiProvider, API_METHODS } from "@providers/api/api";
import { AuthenticationProvider } from "@providers/authentication/authentication";
import { WorkspaceRepository } from "@repositories/workspace";
import { Observable, of, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CONFIG } from "../values/config";

@Injectable()
export class WorkspacesService {
  private workspaces: Workspace[] = [];

  constructor(
    private api: ApiProvider,
    public auth: AuthenticationProvider,
    public repository: WorkspaceRepository
  ) {}

  get self() {
    return this;
  }

  public sendRequest() {
    return this.api
      .syncApi(
        null,
        `${environment.sync_uri.replace("{env}", CONFIG.prod ? "prod" : "dev")}/app/sync/workspaces`,
        API_METHODS.GET
      )
      .pipe(
        map((item: Workspace[]) => {
          this.workspaces = item;
          return item;
        }),
        catchError(e => {
          //console.log("erro" + e);
          this.workspaces = [
            <Workspace>{
              workspaceId: 40,
              name: "ECS",
              link: "http://devapi.interplayers.com.br/dev3/api/",
              token: "http://devapi.interplayers.com.br/dev3/token",
              active: false
            }
          ];
          return of(
            throwError(StackSyncErrorsEnum.WORKSPACES)
          );
        })
      );
  }

  public saveInStorage() {
    return this.repository.updateDelete()
      .then(() => Promise.all(this.saveWorkspaces()))
      .then(() => this.repository.deleteAll());
  }

  public go() {
    try {
      return this.sendRequest();
    } catch (e) {
      //console.log("erro worckspace" + e);
      return of(
        throwError(StackSyncErrorsEnum.WORKSPACES_NOT_KNOW)
      );
    }
  }

  private saveWorkspaces() {
    return this.workspaces
      .filter(item =>
        CONFIG.allowed_workspaces && Array.isArray(CONFIG.allowed_workspaces)
          ? CONFIG.allowed_workspaces.indexOf(item.workspaceId) > -1
          : true
      )
      .map(item => this.repository.saveWorkspace(item));
  }
}
