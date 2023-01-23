import { EntityEnum } from '@dbentities/EntityEnum';
import { User } from '@dbentities/User';
import { Workspace } from '@dbentities/Workspace';
import { ResearchComplementaryResponse } from './ResearchComplementaryResponse';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn,
    OneToOne,
    Relation
} from 'typeorm';


@Entity(EntityEnum.RESEARCH_COMPLEMENTARY)
export class ResearchComplementary {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'research'
    })
    pesquisa: string;

    @Column({
        name: 'workspaceId'
    })
    workspaceId: number;

    @Column({
        name: 'userId'
    })
    userId: number;

    @OneToOne(() => Workspace, workspace => workspace.researchComplementary)
    @JoinColumn({ name: "workspaceId" })
    workspace: Relation<Workspace>;

    @OneToOne(() => User, user => user.researchComplementary)
    @JoinColumn({ name: "userId" })
    user: Relation<User>;

    @OneToMany(() => ResearchComplementaryResponse, researchComplementaryResponse => researchComplementaryResponse.researchComplementary)
    researchComplementaryResponses: ResearchComplementaryResponse[];
}
