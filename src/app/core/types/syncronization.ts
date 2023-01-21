import { User } from "@dbentities/User";
import { Workspace } from "@dbentities/Workspace";
// import { StatusSyncronization } from "@models/enum";
import { TipoPedidoEnum } from "@models/pedido";
import { StatusSyncronization } from "./enum";
import { DistribuidoresPrazoPagamento } from "./requests";
// import { DistribuidoresPrazoPagamento } from "@models/store";

export interface Authorization {
  user: string;
  password: string;
}

export module Synchronization {
  export interface PushNotification {
    Token: string;
    Success: ActionYes;
    Error: ActionNo;
  }

  interface ActionYes {
    MessageYes: string;
    TitleYes: string;
    DataYes: any;
  }

  interface ActionNo {
    MessageNo: string;
    TitleNo: string;
    DataNo: any;
  }

  export interface EnvioSincronizacao<T> {
    id?: number;
    userId: string;
    orderId: string;
    workSpace: string;
    authorization: Authorization;
    authorizationUri: string;
    timeStamp: Date;
    orderStatus: StatusSyncronization;
    verb: string;
    payLoadUrl: string;
    payLoad?: Array<T>;
    pushNotification?: PushNotification;
    forApproval?: boolean;
  }

  export enum TypeSync {
    PEDIDO = 1,
    VISITAS = 2
  }

  export enum   TypeSynchronizationSending {
    UNIQUE_SEND,
    MULTIPLE_SEND,
    NOT_SEND,
    UNDEFINED
  }
}

export interface IDeadlinePayment {
  id?: number;
  idPrazoPagamento: number;
  codigo: string;
  descricao?: string;
  prazo: number;
  distribuidores: string | DistribuidoresPrazoPagamento[];
  tipoPedido: TipoPedidoEnum;
  workspaceId?: number;
  userId?: number;
  storeId?: number;
  workspace: Workspace;
  user: User;
}
