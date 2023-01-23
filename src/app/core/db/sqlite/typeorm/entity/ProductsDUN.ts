import { EntityEnum } from "@dbentities/EntityEnum";
import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";

@Entity(EntityEnum.DUN)
export class ProductsDUN {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "Apresentacao"
  })
  Apresentacao: string;

  @Column({
    name: "DUN"
  })
  DUN: string;

  @Column({
    name: "DataAtualizacao"
  })
  DataAtualizacao: string;

  @Column({
    name: "DataCadastro"
  })
  DataCadastro: string;

  @Column({
    name: "Destaque"
  })
  Destaque: boolean;

  @Column({
    name: "Foto"
  })
  Foto: string;

  @Column({
    name: "Quantidade"
  })
  Quantidade: number;

  @Column({
    name: "Status"
  })
  Status: boolean;

  @Column({
    name: "idProduto"
  })
  idProduto: number;

  @Column({
    name: "idProdutoDUN"
  })
  idProdutoDUN: number;

  @Column({
    name: "isDeleted"
  })
  isDeleted?: boolean;

  @Column({
    name: "isDemonstraGridPedido"
  })
  isDemonstraGridPedido: boolean;

  @Column({
    name: "isPedidoEspecial"
  })
  isPedidoEspecial: boolean;
  
  distributorId: number;
}
