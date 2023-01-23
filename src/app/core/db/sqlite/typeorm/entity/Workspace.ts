import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { IUser } from "../interfaces/User";
import { ComboDeals } from "./ComboDeals";
import { EntityEnum } from "./EntityEnum";
import { MixDistributors } from "./MixDistributors";
import { PdvRelatedToShareOfShelfResearch } from "./PdvRelatedToShareOfShelfResearch";
import { Permission } from "./Permission";
import { ProductsBaseDiscount } from "./ProductsBaseDiscount";
import { Research } from "./Research";
import { ResearchComplementary } from "./ResearchComplementary";
import { ResearchComplementaryResponse } from "./ResearchComplementaryResponse";
import { ResearchField } from "./ResearchField";
import { ResearchShareOfShelf } from "./ResearchShareOfShelf";
import { ResearchTradeMarketing } from "./ResearchTradeMarketing";
import { ResearchWithStep } from "./ResearchWithStep";
import { ShareOfShelf } from "./ShareOfShelf";
import { Store } from "./Store";
import { StoreRoute } from "./StoreRoute";
import { SystemParametrizations } from "./SystemParametrizations";
import { Tabloid } from "./Tabloid";
import { Theme } from "./Theme";
import { User } from "./User";
import { Visit } from "./Visit";

@Entity(EntityEnum.WORKSPACE)
export class Workspace {

  @OneToMany(type => Tabloid, tabloid => tabloid.workspace)
  tabloids: Tabloid[];

  @OneToMany(type => Visit, visit => visit.workspace, { onDelete: 'NO ACTION' })
  visits: Visit[];

  @OneToOne(
    () => SystemParametrizations,
    systemParametrizations => systemParametrizations.workspace
  )
  systemParametrizations: SystemParametrizations;

  @OneToMany(
    type => ResearchWithStep,
    researchWithStep => researchWithStep.workspace
  )
  researchsWithStep: ResearchWithStep[];

  @OneToOne(
    () => ResearchTradeMarketing,
    researchTradeMarketing => researchTradeMarketing.workspace
  )
  researchTradeMarketing: ResearchTradeMarketing;

  @OneToMany(
    type => ResearchComplementaryResponse,
    researchComplementaryResponse => researchComplementaryResponse.workspace
  )
  researchesComplementariesResponses: ResearchComplementaryResponse[];

  @OneToMany(
    type => ResearchField,
    researchComplementaryResponse => researchComplementaryResponse.workspace
  )
  researchFields: ResearchField[];

  @OneToOne(
    () => ResearchComplementary,
    researchComplementary => researchComplementary.user
  )
  researchComplementary: ResearchComplementary;


  @OneToMany(() => Permission, permission => permission.workspace)
  permissions: Permission[];

  @OneToMany(
    type => ProductsBaseDiscount,
    productsBaseDiscount => productsBaseDiscount.workspace
  )
  productsBaseDiscounts: Relation<ProductsBaseDiscount[]>;

  @OneToMany(type => ComboDeals, combo => combo.workspace)
  combos: ComboDeals[];

  @OneToMany(
    type => MixDistributors,
    mixDistributor => mixDistributor.workspace
  )
  mixDistributors: MixDistributors[];

  @OneToMany(type => Research, research => research.workspace)
  researchs: Research[];
  
  @OneToMany(type => PdvRelatedToShareOfShelfResearch, pdvRelated => pdvRelated.workspace)
  PdvRelatedToSearch: PdvRelatedToShareOfShelfResearch;

  @OneToMany(type => ResearchShareOfShelf, share => share.workspace)
  researchShareOfShelf: ResearchShareOfShelf;
  
  @OneToMany(type => ShareOfShelf, share => share.workspace)
  shareOfShelf: ShareOfShelf;

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
