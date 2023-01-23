import { EntityEnum } from '@dbentities/EntityEnum';
import { StoreRoute } from '@dbentities/StoreRoute';
import { User } from '@dbentities/User';
import { Workspace } from '@dbentities/Workspace';
import { ResearchComplementary } from './ResearchComplementary';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
    Relation
} from 'typeorm';

@Entity(EntityEnum.RESEARCH_COMPLEMENTARY_RESPONSE)
export class ResearchComplementaryResponse {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'response'
    })
    response: string;

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

    @OneToOne(() => StoreRoute, storeRoute => storeRoute.researchComplementaryResponse)
    @JoinColumn({ name: 'storeRouteId' })
    storeRoute: Relation<StoreRoute>;

    @ManyToOne(type => Workspace, workspace => workspace.researchesComplementariesResponses)
    @JoinColumn({ name: 'workspaceId' })
    workspace: Relation<Workspace>;

    @ManyToOne(() => User, user => user.researchesComplementariesResponses)
    @JoinColumn({ name: 'userId' })
    user: Relation<User>;

    @ManyToOne(() => ResearchComplementary, researchComplementary => researchComplementary.researchComplementaryResponses)
    @JoinColumn({ name: 'researchComplementaryId' })
	researchComplementary: Relation<ResearchComplementary>;
}
