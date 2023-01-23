// DiscountAndOrderParametrizations
import { EntityEnum } from "@dbentities/EntityEnum";
import { User } from "@dbentities/User";
import { Workspace } from "@dbentities/Workspace";

import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  Relation
} from "typeorm";

@Entity(EntityEnum.SYSTEM_PARAMETRIZATIONS)
export class SystemParametrizations {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "parametrizacaoGeraisDescontoEPedido"
  })
  parametrizacaoGeraisDescontoEPedido: string;

  @Column({
    name: "workspaceId"
  })
  workspaceId: number;

  @Column({
    name: "userId"
  })
  userId: number;

  @OneToOne(() => Workspace, workspace => workspace.systemParametrizations)
  @JoinColumn({ name: "workspaceId" })
  workspace: Relation<Workspace>;

  @OneToOne(() => User, user => user.systemParametrizations)
  @JoinColumn({ name: "userId" })
  user: Relation<User>;
}
