import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EntityEnum } from './EntityEnum';
import { Workspace } from './Workspace';
import { User } from './User';

@Entity(EntityEnum.RESEARCH_FIELD)
export class ResearchField {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
	id: number;

	@Column({
        name: 'descricao'
    })
	descricao: string;
	
	@Column({
        name: 'campos'
    })
    campos: string;
    
    @Column({
        name: 'researchKey'
    })
    researchKey: string;

    @ManyToOne(type => Workspace, workspace => workspace.researchFields)
    @JoinColumn({ name: 'workspaceId' })
    workspace: Relation<Workspace>;

    @ManyToOne(() => User, user => user.researchFields)
    @JoinColumn({ name: 'userId' })
    user: Relation<User>;
}