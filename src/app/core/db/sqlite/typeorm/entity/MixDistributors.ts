// import {DistributorsPaymentDeadline} from '@dbentities/DistributorsPaymentDeadline';
// import {TipoPedidoEnum} from '@models/pedido';
// import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from 'typeorm';
// import {EntityEnum} from './EntityEnum';
// import {Workspace} from './Workspace';

// @Entity(EntityEnum.MIX_DISTRIBUTORS)
// export class MixDistributors {

//     @PrimaryGeneratedColumn({
//         name: 'id'
//     })
//     id?: number;

//     @Column({
//         name: 'tipoPedido'
//     })
//     tipoPedido: TipoPedidoEnum;

//     @Column({
//         name: 'workspaceId'
//     })
//     workspaceId: number;

//     @Column({
//         name: 'distributorId'
//     })
//     distributorId: number;

//     @Column({
//         name: 'productId'
//     })
//     productId: number;
    
//     @Column({
//         name: 'productDunId'
//     })
//     productDunId: number;

//     @ManyToOne(type => Workspace, workspace => workspace.mixDistributors, {
//         nullable: true,
//         persistence: false,
//         onDelete: 'NO ACTION'
//     })
//     @JoinColumn({name: 'workspaceId'})
//     workspace: Relation<Workspace>;

//     // @ManyToOne(type => DistributorsPaymentDeadline, distributor => distributor.mixDistributors, {
//     //     nullable: true,
//     //     persistence: false,
//     //     onDelete: 'NO ACTION'
//     // })
//     // @JoinColumn({name: 'distributorId'})
//     // distributor: Relation<DistributorsPaymentDeadline>;

//     // @ManyToOne(type => Products, product => product.mixDistributors, {
//     //     nullable: true,
//     //     persistence: false,
//     //     onDelete: 'NO ACTION'
//     // })
//     // @JoinColumn({name: 'productId'})
//     // product: Products;
// }