import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EntityEnum } from './EntityEnum';
import { ResearchWithStep } from './ResearchWithStep';

@Entity(EntityEnum.RESEARCH_WITH_STEP_FIELD)
export class ResearchWithStepField {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  id: number;

	@Column({
    name: 'descricao'
  })
	descricao: string;

	@Column({
    name: 'parametrizacaoCampo'
  })
	parametrizacaoCampo: string;

	@Column({
    name: 'visivel'
  })
	visivel: boolean;

	@Column({
    name: 'obrigatorio'
  })
	obrigatorio: boolean;

	@Column({
    name: 'ordem'
  })
  ordem: number;

  @Column({
    name: 'idPesquisaCampo'
  })
  idPesquisaCampo: number;

  @Column({
    name: 'idPesquisaParametrizacao'
  })
  idPesquisaParametrizacao: number;

  @Column({
    name: 'idPesquisaParametrizacaoCampo'
  })
  idPesquisaParametrizacaoCampo: number;

	@Column({
    name: 'researchWithStepId'
  })
  researchWithStepId: number;

	@ManyToOne(() => ResearchWithStep, researchWithStep => researchWithStep.researchWithStepFields)
  @JoinColumn({ name: 'researchWithStepId' })
  researchWithStep: Relation<ResearchWithStep>;
}
