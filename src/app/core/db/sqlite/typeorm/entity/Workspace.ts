import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { EntityEnum } from "./EntityEnum";

@Entity(EntityEnum.WORKSPACE)
export class Workspace {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "name"
  })
  name: string;

  @Column({
    name: "workspaceId"
  })
  workspaceId: number;

  @Column({
    name: "link"
  })
  link: string;

  @Column({
    name: "token"
  })
  token: string;

  @Column({
    name: "active"
  })
  active: boolean;

  @Column({
    name: "deleted"
  })
  deleted: boolean;
}
