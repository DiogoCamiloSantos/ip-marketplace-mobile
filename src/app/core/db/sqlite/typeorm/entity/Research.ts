import { EntityEnum } from '@dbentities/EntityEnum';
import { StoreRoute } from '@dbentities/StoreRoute';
import { User } from '@dbentities/User';
import { Workspace } from '@dbentities/Workspace';
import { ResearchResponse } from './ResearchResponse';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation
} from 'typeorm';

@Entity(EntityEnum.RESEARCH)
export class Research {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'descricao'
    })
    descricao: string;

    @Column({
        name: 'researchKey'
    })
    researchKey: string;

    @Column({
        name: 'storeRouteId'
    })
    storeRouteId: number;

    @Column({
        name: 'workspaceId'
    })
    workspaceId: number;

    @Column({
        name: 'userId'
    })
    userId: number;

    @Column({
        name: 'sync',
        nullable: false,
        default: 0
    })
    sync: boolean;

    @OneToOne(() => StoreRoute, storeRoute => storeRoute.research)
    @JoinColumn({ name: 'storeRouteId' })
    storeRoute: StoreRoute;

    @ManyToOne(type => Workspace, workspace => workspace.researchs)
    @JoinColumn({ name: 'workspaceId' })
    workspace: Relation<Workspace>;

    @ManyToOne(() => User, user => user.researchs)
    @JoinColumn({ name: 'userId' })
    user: Relation<User>;

    @OneToMany(() => ResearchResponse, researchResponse => researchResponse.research)
    researchResponses: ResearchResponse[];
}