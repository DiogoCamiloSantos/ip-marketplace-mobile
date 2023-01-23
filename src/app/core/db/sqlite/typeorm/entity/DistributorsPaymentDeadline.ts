import { TipoPedidoEnum } from '@models/pedido';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EntityEnum } from './EntityEnum';
// import { MixDistributors } from './MixDistributors';
// import { ProductsBaseDiscount } from './ProductsBaseDiscount';
import { User } from './User';
import { Workspace } from './Workspace';

@Entity(EntityEnum.DISTRIBUTORS_PAYMENT_DEADLINE)
export class DistributorsPaymentDeadline {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id?: number;

    @Column({
        name: 'distribuidorId'
    })
    distribuidorId: number;

    @Column({
        name: 'nomeFantasia'
    })
    nomeFantasia: string;

    @Column({
        name: 'razaoSocial'
    })
    razaoSocial?: string;

    @Column({
        name: 'ordemDePreferencia'
    })
    ordemDePreferencia: number;

    @Column({
        name: 'tipoPedido'
    })
    tipoPedido: TipoPedidoEnum;

    @Column({
        name: 'workspaceId'
    })
    workspaceId: number;

    @Column({
        name: 'userId'
    })
    userId: number;

    @Column({
        name: 'storeId'
    })
    storeId: number;

    @ManyToOne(type => Workspace, workspace => workspace.storeRoutes)
    @JoinColumn({ name: 'workspaceId' })
    workspace?: Relation<Workspace>;

    @ManyToOne(type => User, user => user.storeRoutes)
    @JoinColumn({ name: 'userId' })
    user?: Relation<User>;

    // @OneToMany(type => MixDistributors, mixDistributor => mixDistributor.distributor)
    // mixDistributors: MixDistributors[];

    // @OneToMany(type => ProductsBaseDiscount, productsBaseDiscount => productsBaseDiscount.distributor)
    // productsBaseDiscounts: ProductsBaseDiscount[];
}
