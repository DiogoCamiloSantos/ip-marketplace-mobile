import { EntityEnum } from '@dbentities/EntityEnum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Workspace } from './Workspace';
import { User } from './User';

@Entity(EntityEnum.RESEARCH_WITH_STEP_RESPONSE)
export class ResearchWithStepResponse {
	@PrimaryGeneratedColumn({
		name: 'id'
	})
	id: number;

	@Column({
		name: 'response'
	})
	response: string;

  @Column({
		name: 'descricao'
	})
	descricao: string;

	@Column({
		name: 'productId'
	})
  productId: number;

  @Column({
		name: 'idRota'
	})
  idRota: number;

  @Column({
		name: 'idPesquisaCampo'
	})
  idPesquisaCampo: number;

  @Column({
    name: 'researchKey'
  })
  researchKey: string;

  @Column({
    name: 'sync',
    default: 0
  })
  sync: boolean;

  @Column({
    name: 'workspaceId'
  })
  workspaceId: number;

  @Column({
    name: 'userId'
  })
  userId: number;

  @ManyToOne(() => Workspace, workspace => workspace.researchsWithStep)
  @JoinColumn({ name: 'workspaceId' })
  workspace: Workspace;

  @ManyToOne(() => User, user => user.researchsWithStep)
  @JoinColumn({ name: 'userId' })
  user: User;
}
