import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ComboDeals } from "./ComboDeals";
import { EntityEnum } from "./EntityEnum";
import { PdvRelatedToShareOfShelfResearch } from "./PdvRelatedToShareOfShelfResearch";
import { Permission } from "./Permission";
import { Preference } from "./Preference";
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
import { Syncronization } from "./Syncronization";
import { SystemParametrizations } from "./SystemParametrizations";
import { Tabloid } from "./Tabloid";
import { Visit } from "./Visit";

@Entity(EntityEnum.USERS)
export class User {
    @OneToMany(type => Tabloid, tabloid => tabloid.user)
    tabloids: Tabloid[];

    @OneToMany(type => Visit, visit => visit.user, { onDelete: 'NO ACTION' })
    visits: Visit[];

    @OneToOne(
      () => SystemParametrizations,
      systemParametrizations => systemParametrizations.user
    )
    systemParametrizations: SystemParametrizations;

    @OneToMany(() => ResearchWithStep, researchWithStep => researchWithStep.user)
    researchsWithStep: ResearchWithStep[];
  

    @OneToOne(
      () => ResearchTradeMarketing,
      researchTradeMarketing => researchTradeMarketing.user
    )
    researchTradeMarketing: ResearchTradeMarketing;

    @OneToMany(
      type => ResearchField,
      researchComplementaryResponse => researchComplementaryResponse.user
    )
    researchFields: ResearchField[];

    @OneToMany(
      () => ResearchComplementaryResponse,
      researchComplementaryResponse => researchComplementaryResponse.user
    )
    researchesComplementariesResponses: ResearchComplementaryResponse[];
  

    @OneToOne(
      () => ResearchComplementary,
      researchComplementary => researchComplementary.user
    )
    researchComplementary: ResearchComplementary;

    @OneToMany(type => Syncronization, syncronization => syncronization.user)
    syncronizations: Syncronization[];

    @OneToMany(type => Preference, preference => preference.user)
    preferences: Preference[];

    @OneToMany(() => Permission, permission => permission.user)
    permissions: Permission[];

    @OneToMany(() => ComboDeals, combo => combo.user)
    combos: ComboDeals[];

    @OneToMany(() => Research, research => research.user)
    researchs: Research[];

    @OneToMany(type => PdvRelatedToShareOfShelfResearch, pdvRelated => pdvRelated.user)
    PdvRelatedToSearch: PdvRelatedToShareOfShelfResearch[];

    @OneToMany(type => ResearchShareOfShelf, research => research.user)
    researchShareOfShelf: ResearchShareOfShelf[];

    @OneToMany(type => ShareOfShelf, research => research.user)
    shareOfShelf: ShareOfShelf[];

    @PrimaryGeneratedColumn({
        name: "id"
    })
    id: number;

    @Column({
        name: "name"
    })
    name: string;

    @Column({
        name: "username"
    })
    username: string;

    @Column({
        name: "password"
    })
    password: string;

    @Column({
        name: "last_token"
    })
    last_token: string;

    @Column({
        name: "userId"
    })
    userId: string;

    @Column({
        name: "perfilId"
    })
    perfilId: string;

    @Column({
        name: "perfil"
    })
    perfil: string;

    @Column({
        name: "expires_in"
    })
    expires_in: Date;

    @Column({
        name: "lastActive"
    })
    lastActive: Date;

    @Column({
        name: "descricaoPerfil",
        nullable: true
    })
    descricaoPerfil: string;

    @OneToMany(type => Store, store => store.user)
    stores: Store[];

    @OneToMany(type => StoreRoute, storeRoute => storeRoute.user)
    storeRoutes: StoreRoute[];

    setor: string;
}