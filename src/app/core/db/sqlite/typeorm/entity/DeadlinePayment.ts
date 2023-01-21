import { TipoPedidoEnum } from "@models/pedido";
import { IDeadlinePayment } from "@models/syncronization";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { EntityEnum } from "./EntityEnum";
import { User } from "./User";
import { Workspace } from "./Workspace";

@Entity(EntityEnum.DEADLINE_PAYMENT)
export class DeadlinePayment implements IDeadlinePayment {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id?: number;

  @Column({
    name: "idPrazoPagamento"
  })
  idPrazoPagamento: number;

  @Column({
    name: "codigo"
  })
  codigo: string;

  @Column({
    name: "descricao"
  })
  descricao?: string;

  @Column({
    name: "prazo"
  })
  prazo: number;

  @Column({
    name: "distribuidores"
  })
  distribuidores: string;

  @Column({
    name: "tipoPedido"
  })
  tipoPedido: TipoPedidoEnum;

  @Column({
    name: "workspaceId"
  })
  workspaceId?: number;

  @Column({
    name: "userId"
  })
  userId?: number;

  @Column({
    name: "storeId"
  })
  storeId?: number;

  @Column({
    name: "tabloidId"
  })
  tabloidId?: number;

  @ManyToOne(type => Workspace, workspace => workspace.storeRoutes)
  @JoinColumn({ name: "workspaceId" })
  workspace: Workspace;

  @ManyToOne(type => User, user => user.storeRoutes)
  @JoinColumn({ name: "userId" })
  user: User;
}
