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

@Entity(EntityEnum.TABLOID)
export class Tabloid {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "idTabloide"
  })
  idTabloide: number;

  @Column({
    name: "posicionamento"
  })
  posicionamento: number;

  @Column({
    name: "urlImagem"
  })
  urlImagem: string;

  @Column({
    name: "descricao"
  })
  descricao: string;

  @Column({
    name: "descricaoTabloide"
  })
  descricaoTabloide: string;

  @Column({
    name: "dataInicio"
  })
  dataInicio: string;

  @Column({
    name: "dataFim"
  })
  dataFim: string;

  @Column({
    name: "mostrarDataExpiracao"
  })
  mostrarDataExpiracao: boolean;

  @Column({
    name: "storeId"
  })
  storeId: number;

  @Column({
    name: "workspaceId"
  })
  workspaceId: number;

  @Column({
    name: "userId"
  })
  userId: number;

  @ManyToOne(type => User, user => user.tabloids)
  @JoinColumn({ name: "userId" })
  user: Relation<User>;

  @ManyToOne(type => Workspace, workspace => workspace.tabloids)
  @JoinColumn({ name: "workspaceId" })
  workspace: Relation<Workspace>;
}
