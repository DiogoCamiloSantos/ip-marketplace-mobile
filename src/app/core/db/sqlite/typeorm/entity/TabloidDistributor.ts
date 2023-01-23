import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { EntityEnum } from "./EntityEnum";
import { User } from "./User";
import { Workspace } from "./Workspace";

@Entity(EntityEnum.TABLOID_DISTRIBUTOR)
export class TabloidDistributor {
  @PrimaryColumn({
    name: "tabloidId"
  })
  tabloidId: number;

  @PrimaryColumn({
    name: "distributorId"
  })
  distributorId: number;

  @Column({
    name: "workspaceId"
  })
  workspaceId: number;

  @Column({
    name: "userId"
  })
  userId: number;

  @ManyToOne(() => Workspace, workspace => workspace.combos)
  @JoinColumn({ name: "workspaceId" })
  workspace: Relation<Workspace>;;

  @ManyToOne(() => User, user => user.combos)
  @JoinColumn({ name: "userId" })
  user: Relation<User>;
}
