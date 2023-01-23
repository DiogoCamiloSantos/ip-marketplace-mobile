import { TipoPedidoEnum } from "@models/pedido";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { EntityEnum } from "./EntityEnum";
import { User } from "./User";
import { Workspace } from "./Workspace";

@Entity(EntityEnum.COMBO_DEALS)
export class ComboDeals {

  // @ManyToMany(() => Product, products => products.combos)
  // @JoinTable({
  //   name: EntityEnum.COMBO_DEALS_PRODUCTS,
  //   joinColumns: [{ name: "comboDealsId" }],
  //   inverseJoinColumns: [{ name: "productId" }]
  // })
  // products: Relation<Product[]>;

  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "idComboOferta"
  })
  idComboOferta: number;

  @Column({
    name: "descricao",
    nullable: true
  })
  descricao: string;

  @Column({
    name: "status",
    nullable: true
  })
  status: string;

  @Column({
    name: "menorDataVigencia",
    nullable: true
  })
  menorDataVigencia: string;

  @Column({
    name: "precoCombo",
    type: 'real',
    nullable: true
  })
  precoCombo: number;

  @Column({
    name: "precoComboLiquido",
    type: 'real',
    nullable: true
  })
  precoComboLiquido: number;

  @Column({
    name: "caminhoFoto",
    nullable: true
  })
  caminhoFoto: string;

  @Column({
    name: "tipoAgrupamentoLojas",
    nullable: true
  })
  tipoAgrupamentoLojas: number;

  @Column({
    name: "locked",
    nullable: true
  })
  locked: boolean;

  @Column({
    name: "tipoPedido",
    nullable: true
  })
  tipoPedido: TipoPedidoEnum;

  @ManyToOne(() => Workspace, workspace => workspace.combos)
  @JoinColumn({ name: "workspaceId" })
  workspace: Workspace;

  @ManyToOne(() => User, user => user.combos)
  @JoinColumn({ name: "userId" })
  user: Relation<User>;
}
