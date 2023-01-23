import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { EntityEnum } from "./EntityEnum";
import { Workspace } from "./Workspace";
import { User } from "./User";

@Entity(EntityEnum.PERMISSION)
export class Permission {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "diretorio"
  })
  diretorio: string;

  @Column({
    name: "codigo"
  })
  codigo: string;

  @Column({
    name: "visualizar"
  })
  visualizar: boolean;

  @Column({
    name: "editar"
  })
  editar: boolean;

  @Column({
    name: "excluir"
  })
  excluir: boolean;

  @Column({
    name: "incluir"
  })
  incluir: boolean;

  @Column({
    name: "workspaceId"
  })
  workspaceId: number;

  @Column({
    name: "userId"
  })
  userId: number;

  @ManyToOne(type => User, user => user.permissions)
  @JoinColumn({ name: "userId" })
  user: Relation<User>;

  @ManyToOne(type => Workspace, workspace => workspace.permissions)
  @JoinColumn({ name: "workspaceId" })
  workspace: Relation<Workspace>;
}
