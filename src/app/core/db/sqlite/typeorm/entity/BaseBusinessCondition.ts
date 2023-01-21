import { TipoPedidoEnum } from '@models/pedido';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityEnum } from './EntityEnum';
import { User } from './User';
import { Workspace } from './Workspace';

@Entity(EntityEnum.BASE_BUSINESS_CONDITION)
export class BaseBusinessCondition {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id?: number;

    @Column({
        name: 'idCondicaoComercialBase'
    })
    idCondicaoComercialBase: number;

    @Column({
        name: 'valorMinimoDePedido'
    })
    valorMinimoDePedido: number;

    @Column({
        name: 'usarLooping'
    })
    usarLooping: boolean;

    @Column({
        name: 'tipoPedido'
    })
    tipoPedido: TipoPedidoEnum;

    @Column({
        name: 'workspaceId'
    })
    workspaceId?: number;

    @Column({
        name: 'userId'
    })
    userId?: number;

    @Column({
        name: 'storeId'
    })
    storeId?: number;

    @ManyToOne(type => Workspace, workspace => workspace.storeRoutes)
    @JoinColumn({ name: 'workspaceId' })
    workspace: Workspace;
    
    @ManyToOne(type => User, user => user.storeRoutes)
    @JoinColumn({ name: 'userId' })
    user: User;
}
