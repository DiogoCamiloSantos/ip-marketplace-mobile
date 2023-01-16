import { Injectable } from "@angular/core";
import { liveQuery } from "dexie";
import { db } from "../db/db";
import { BackendUrl } from "../gateways/back-end.url";
import { RemoteGatewayFactory } from "../gateways/remote-gateway-factory";
import { Url } from "../gateways/url";
import { Workspace } from "../models/Workspace";

@Injectable()
export class WorkspacesService {
  workspaces = liveQuery(() => db.Workspaces.toArray());

  constructor(
    private remoteGatewayFactory: RemoteGatewayFactory,
  ) {}

  get self() {
    return this;
  }

  private async download(): Promise<Workspace[]> {
    const gateway = this.remoteGatewayFactory.createDefaultRemoteGateway();
    const list = (await gateway.get(new BackendUrl('/workspaces'))) as Workspace[];

    return list;
  }

  private async saveInStorage(list: Workspace[]) {
    await this.clearStorage();
    await db.Workspaces.bulkAdd(list);
  }

  private async clearStorage() {
    await db.Workspaces.clear();
  }

  public async sync() {    
    await this.download().then(list => this.saveInStorage(list));
  }

  public async getAll(): Promise<Workspace[]> {
    return await db.Workspaces.toArray();
  }
}
