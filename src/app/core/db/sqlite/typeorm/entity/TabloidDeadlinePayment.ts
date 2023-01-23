import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn, Relation } from "typeorm";
import { EntityEnum } from "./EntityEnum";
import { Workspace } from "./Workspace";
import { User } from "./User";

@Entity(EntityEnum.TABLOID_DEADLINE_PAYMENT)
export class TabloidDeadlinePayment {
  @PrimaryColumn({
    name: "tabloidId"
  })
  tabloidId: number;

  @PrimaryColumn({
    name: "deadlinePaymentId"
  })
  deadlinePaymentId: number;

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
