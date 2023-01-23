import { EntityEnum } from '@dbentities/EntityEnum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { Research } from './Research';

@Entity(EntityEnum.RESEARCH_RESPONSE)
export class ResearchResponse {
	@PrimaryGeneratedColumn({
		name: 'id'
	})
	id: number;

	@Column({
		name: 'response'
	})
	response: string;

	@Column({
		name: 'researchId'
	})
	researchId: number;

	@ManyToOne(() => Research, research => research.researchResponses)
    @JoinColumn({ name: 'researchId' })
	research: Relation<Research>;
}