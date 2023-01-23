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

@Entity(EntityEnum.RESEARCH_TRADE)
export class ResearchTradeMarketing {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "research"
  })
  pesquisa: string;

  @Column({
    name: "idStore"
  })
  idStore: number;

  @OneToOne(() => Workspace, workspace => workspace.researchTradeMarketing)
  @JoinColumn({ name: "workspaceId" })
  workspace: Relation<Workspace>;

  @OneToOne(() => User, user => user.researchTradeMarketing)
  @JoinColumn({ name: "userId" })
  user: Relation<User>;
}
