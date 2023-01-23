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
// import { Products } from "./Products";
import { User } from "./User";
import { Workspace } from "./Workspace";

@Entity(EntityEnum.COMBO_DEALS)
export class ComboDeals {

  // @ManyToMany(() => Products, products => products.combos)
  // @JoinTable({
  //   name: EntityEnum.COMBO_DEALS_PRODUCTS,
  //   joinColumns: [{ name: "comboDealsId" }],
  //   inverseJoinColumns: [{ name: "productId" }]
  // })
  // products: Products[];

  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "idComboOferta"
  })
  idComboOferta: number;

  @Column({
    name: "descricao"
  })
  descricao: string;

  @Column({
    name: "status"
  })
  status: string;

  @Column({
    name: "menorDataVigencia"
  })
  menorDataVigencia: string;

  @Column({
    name: "precoCombo"
  })
  precoCombo: number;

  @Column({
    name: "precoComboLiquido"
  })
  precoComboLiquido: number;

  @Column({
    name: "caminhoFoto"
  })
  caminhoFoto: string;

  @Column({
    name: "tipoAgrupamentoLojas"
  })
  tipoAgrupamentoLojas: number;

  @Column({
    name: "locked"
  })
  locked: boolean;

  @Column({
    name: "tipoPedido"
  })
  tipoPedido: TipoPedidoEnum;

  @Column({
    name: "workspaceId"
  })
  workspaceId: number;

  @Column({
    name: "userId"
  })
  userId: number;

  @ManyToOne(() => Workspace, workspace => workspace.combos)
  @JoinColumn({ name: "workspaceId" })
  workspace: Workspace;

  @ManyToOne(() => User, user => user.combos)
  @JoinColumn({ name: "userId" })
  user: Relation<User>;

  // @ManyToMany(() => Products, products => products.combos)
  // @JoinTable({
  //   name: EntityEnum.COMBO_DEALS_PRODUCTS,
  //   joinColumns: [{ name: "comboDealsId" }],
  //   inverseJoinColumns: [{ name: "productId" }]
  // })
  // products: Products[];
}
