import { EntityEnum } from '@dbentities/EntityEnum';
import { ResearchWithStepField } from '@dbentities/ResearchWithStepField';
import { StoreRoute } from '@dbentities/StoreRoute';
import { User } from '@dbentities/User';
import { Workspace } from '@dbentities/Workspace';
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

@Entity(EntityEnum.RESEARCH_WITH_STEP)
export class ResearchWithStep {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'idParametrizacaoPesquisa'
    })
    idParametrizacaoPesquisa: number;

    @Column({
        name: 'storeRouteId'
    })
    storeRouteId: number;

    @Column({
        name: 'researchKey'
    })
    researchKey: string;

    @Column({
      name: 'products'
    })
    products: string;

    @Column({
        name: 'sync',
        nullable: false,
        default: 0
    })
    sync: boolean;

    @OneToOne(() => StoreRoute, storeRoute => storeRoute.researchWithStep)
    @JoinColumn({ name: 'storeRouteId' })
    storeRoute: Relation<StoreRoute>;

    @ManyToOne(() => Workspace, workspace => workspace.researchsWithStep)
    @JoinColumn({ name: 'workspaceId' })
    workspace: Relation<Workspace>;

    @ManyToOne(() => User, user => user.researchsWithStep)
    @JoinColumn({ name: 'userId' })
    user: Relation<User>;

    @OneToMany(() => ResearchWithStepField, researchWithStepField => researchWithStepField.researchWithStep)
    researchWithStepFields: ResearchWithStepField[];
}
