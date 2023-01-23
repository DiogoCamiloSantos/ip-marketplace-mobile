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
        name: 'idCondicaoComercialBase', 
        nullable: true,
    })
    idCondicaoComercialBase: number;

    @Column({
        name: 'valorMinimoDePedido', 
        type: 'real', 
        nullable: true,
    })
    valorMinimoDePedido: number;

    @Column({
        name: 'usarLooping', 
        nullable: true,
        default: false
    })
    usarLooping: boolean;

    @Column({
        name: 'tipoPedido', 
        nullable: true,
    })
    tipoPedido: TipoPedidoEnum;

    @Column({
        name: 'workspaceId', 
        nullable: true,
    })
    workspaceId?: number;

    @Column({
        name: 'userId',
        nullable: true
    })
    userId?: number;

    @Column({
        name: 'storeId',
        nullable: true
    })
    storeId?: number;

    @ManyToOne(type => Workspace, workspace => workspace.storeRoutes)
    @JoinColumn({ name: 'workspaceId' })
    workspace: Workspace;

    @ManyToOne(type => User, user => user.storeRoutes)
    @JoinColumn({ name: 'userId' })
    user: User;
}
