import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EntityEnum } from './EntityEnum';
import { Research } from './Research';
import { ResearchComplementaryResponse } from './ResearchComplementaryResponse';
import { Store } from './Store';
import { User } from './User';
import { Workspace } from './Workspace';

@Entity(EntityEnum.STORE_ROUTE)
export class StoreRoute {

    @ManyToOne(type => Workspace, workspace => workspace.storeRoutes)
    @JoinColumn({ name: 'workspaceId' })
    workspace: Relation<Workspace>;

    @ManyToOne(type => User, user => user.storeRoutes)
    @JoinColumn({ name: 'userId' })
    user: Relation<User>;

    @ManyToOne(type => Store, store => store.storeRoutes)
    @JoinColumn()
    store: Relation<Store>;

    @OneToOne(type => Research, research => research.storeRoute)
    research: Relation<Research>;


    // @OneToOne(type => ResearchWithStep, researchWithStep => researchWithStep.storeRoute)
    // researchWithStep: ResearchWithStep;


    @OneToOne(() => ResearchComplementaryResponse, researchComplementaryResponse => researchComplementaryResponse.storeRoute)
    researchComplementaryResponse: ResearchComplementaryResponse;

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'date'
    })
    date: Date;

    @Column({
        name: 'idDestino'
    })
    idDestino: number;

    @Column({
        name: 'idOrigem'
    })
    idOrigem: number;

    @Column({
        name: 'idRoteiro'
    })
    idRoteiro: number;

    @Column({
        name: 'idSetor'
    })
    idSetor: number;

    @Column({
        name: 'idRota'
    })
    idRota: number;

    @Column({
        name: 'idPdv'
    })
    idPdv: number;

    @Column({
        name: 'sync'
    })
    sync: boolean;

    @Column({
      name: 'ordemDePreferencia'
    })
    ordemDePreferencia: number;

    @Column({
        name: 'workspaceId'
    })
    workspaceId: number;

    @Column({
        name: 'userId'
    })
    userId: number;

    @Column({
        name: 'visit'
    })
    visit: boolean;

    @Column({
        name: 'portalPlannig'
    })
    portalPlannig: boolean;
}
