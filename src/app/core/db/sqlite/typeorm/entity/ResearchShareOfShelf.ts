import { ShareOfShelf } from "@dbentities/ShareOfShelf";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from "typeorm";
import { EntityEnum } from './EntityEnum';
import { PdvRelatedToShareOfShelfResearch } from "./PdvRelatedToShareOfShelfResearch";
import { User } from "./User";
import { Workspace } from "./Workspace";


@Entity(EntityEnum.RESEARCH_SHARE_OF_SHELF)
export class ResearchShareOfShelf {

    @ManyToOne(type => User, user => user.researchShareOfShelf)
    @JoinColumn({ name: "userId" })
    user: Relation<User>;

    @ManyToOne(type => Workspace, workspace => workspace.researchShareOfShelf)
    @JoinColumn({ name: "workspaceId" })
    workspace: Relation<Workspace>;
    
    constructor() {
        this.products = [];
    }
    
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id: string;
    
    @Column({
        name: 'idPesquisa'
    })
    public researchId: number;
    
    @Column({
        name: 'descricao'
    })
    public description: string;    
    
    @Column({
        name: 'idCiclo'
    })
    public cicleId: number;

    @Column({
        name: 'ciclo'
    })
    public cicle: string;

    @Column({
        name: 'idSubCanalVenda'
    })
    public subchannelForSaleId: number;

    @Column({
        name: 'subCanalVenda'
    })
    public subchannelForSale: string;

    @Column({
        name: 'idRede'
    })
    public networkId: number;

    @Column({
        name: 'rede'
    })
    public network: string;

    @Column({
        name: 'tamanhoPdv',
        type: 'integer'
    })
    public pdvLength: ShareOfShelfPdvLength;

    @Column({
        name: 'status'
    })
    public status: string;
    
    public products: ShareOfShelf[];
    public pdvRelatedResearchShareOfShelf: Relation<PdvRelatedToShareOfShelfResearch[]>;
}

export enum ShareOfShelfPdvLength {
    Pequeno = 1,
    Medio = 2,
    Grande = 3
}
