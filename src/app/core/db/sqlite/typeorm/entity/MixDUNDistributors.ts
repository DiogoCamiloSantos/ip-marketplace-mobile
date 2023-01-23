import {DistributorsPaymentDeadline} from '@dbentities/DistributorsPaymentDeadline';
import {TipoPedidoEnum} from '@models/pedido';
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {EntityEnum} from './EntityEnum';
import {Workspace} from './Workspace';

@Entity(EntityEnum.MIX_DUN_DISTRIBUTORS)
export class MixDUNDistributors {

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id?: number;

    @Column({
        name: 'idProdutoDUN'
    })
    idProdutoDUN: number;

    @Column({
        name: 'idsDistribuidores'
    })
    idsDistribuidores: string;

    @ManyToOne(type => Workspace, workspace => workspace.mixDistributors, {
        nullable: true,
        persistence: false,
        onDelete: 'NO ACTION'
    })
    @JoinColumn({name: 'workspaceId'})
    workspace: Workspace;
}

