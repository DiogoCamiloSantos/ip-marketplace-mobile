import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { IUser } from '../interfaces/User';
import { EntityEnum } from './EntityEnum';
import { User } from './User';
import { Workspace } from './Workspace';

@Entity(EntityEnum.STORES)
export class Store {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'razaoSocial'
    })
    razaoSocial: string;

    @Column({
        name: 'nomeFantasia'
    })
    nomeFantasia: string;

    @Column({
        name: 'setor'
    })
    setor: string;

    @Column({
        name: 'bandeiraNomeFantasia'
    })
    bandeiraNomeFantasia: string;

    @Column({
        name: 'bandeiraRazaoSocial'
    })
    bandeiraRazaoSocial: string;

    @Column({
        name: 'logradouro'
    })
    logradouro: string;

    @Column({
        name: 'numero'
    })
    numero: string;

    @Column({
        name: 'complemento'
    })
    complemento: string;

    @Column({
        name: 'CEP'
    })
    CEP: string;

    @Column({
        name: 'bairro'
    })
    bairro: string;

    @Column({
        name: 'cidade'
    })
    cidade: string;

    @Column({
        name: 'estado'
    })
    estado: string;

    @Column({
        name: 'CNPJ'
    })
    CNPJ: string;

    @Column({
        name: 'telefone'
    })
    telefone: string;

    @Column({
        name: 'telefone2'
    })
    telefone2: string;

    @Column({
        name: 'celular'
    })
    celular: string;

    @Column({
        name: 'fax'
    })
    fax: string;

    @Column({
        name: 'email'
    })
    email: string;

    @Column({
        name: 'idStore'
    })
    idStore: number;

    @Column({
        name: 'idEndereco'
    })
    idEndereco: number;

    @Column({
        name: 'idPdv'
    })
    idPdv: number;

    @Column({
        name: 'idSetorVisita'
    })
    idSetorVisita: number;

    @Column({
        name: 'workspaceId'
    })
    workspaceId: number;

    @Column({
        name: 'userId'
    })
    userId: number;

    @Column({
        name: 'deleted'
    })
    deleted: boolean;

    @Column({
        name: 'isVisita'
    })
    isVisita: boolean;

    @Column({
        name: 'isPedido'
    })
    isPedido: boolean;

    @Column({
        name: 'visitGoal'
    })
    metaVisita: number;

    @Column({
        name: 'visitsMade'
    })
    visitasRealizadas: number;

    @ManyToOne(type => User, user => user.stores)
    @JoinColumn({ name: 'userId' })
    user: Relation<User>;

    @ManyToOne(type => Workspace, workspace => workspace.user)
    @JoinColumn({ name: 'workspaceId' })
    workspace: Workspace;
}
