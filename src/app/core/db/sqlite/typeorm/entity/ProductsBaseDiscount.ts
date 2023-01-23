import { TipoPedidoEnum } from "@models/pedido";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { DistributorsPaymentDeadline } from "./DistributorsPaymentDeadline";
import { EntityEnum } from "./EntityEnum";
import { Product } from "./Products";
import { Workspace } from "./Workspace";

@Entity(EntityEnum.SKU_BASE_DISCOUNT)
export class ProductsBaseDiscount {

  @ManyToOne(
    type => DistributorsPaymentDeadline,
    distributor => distributor.productsBaseDiscounts
  )
  @JoinColumn({ name: "distributorId" })
  distributor: Relation<DistributorsPaymentDeadline>;

  @ManyToOne(type => Product, product => product.productsBaseDiscounts)
  @JoinColumn({ name: "productId" })
  product: Product;

  @PrimaryGeneratedColumn({
    name: "id"
  })
  id?: number;

  @Column({
    name: "tipoPedido"
  })
  tipoPedido: TipoPedidoEnum;

  @Column({
    name: "faixaDesconto"
  })
  faixaDesconto: string;

  @Column({
    name: "preco"
  })
  preco: number;

  @Column({
    name: "precoMinimo"
  })
  precoMinimo: number;

  @Column({
    name: "quantidadeEstoque"
  })
  quantidadeEstoque?: number;

  @Column({
    name: "precoDistribuidor"
  })
  precoDistribuidor: boolean;

    @Column({
        name: 'cupomDesconto'
    })
    cupomDesconto: boolean;

  @Column({
    name: "workspaceId"
  })
  workspaceId: number;

  @Column({
    name: "distributorId"
  })
  distributorId: number;

  @Column({
    name: "productId"
  })
  productId: number;

  @Column({
    name: "tabloidId"
  })
  tabloidId?: number;

  @ManyToOne(type => Workspace, workspace => workspace.productsBaseDiscounts)
  @JoinColumn({ name: "workspaceId" })
  workspace: Relation<Workspace>;
}
