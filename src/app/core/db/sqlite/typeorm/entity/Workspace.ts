import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { IUser } from "../interfaces/User";
import { ComboDeals } from "./ComboDeals";
import { EntityEnum } from "./EntityEnum";
import { Store } from "./Store";
import { StoreRoute } from "./StoreRoute";
import { Theme } from "./Theme";
import { User } from "./User";

@Entity(EntityEnum.WORKSPACE)
export class Workspace {


  @OneToMany(type => ComboDeals, combo => combo.workspace)
  combos: ComboDeals[];

  // @OneToMany(
  //   type => MixDistributors,
  //   mixDistributor => mixDistributor.workspace
  // )
  // mixDistributors: MixDistributors[];

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

  @OneToMany(type => Store, store => store.workspace)
  stores: Store[];

  @OneToOne(() => User, user => user.id, {
    nullable: true,
    persistence: false,
    onDelete: "NO ACTION"
  })
  @JoinColumn({ name: "userIdFK" })
  user: Relation<User>;

  @OneToMany(type => StoreRoute, storeRoute => storeRoute.workspace)
  storeRoutes: StoreRoute[];

  @OneToOne(type => Theme, theme => theme.workspace)
  @JoinColumn()
  theme: Relation<Theme>;
}
