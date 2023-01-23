import { EntityEnum } from "@dbentities/EntityEnum";
import { User } from "@dbentities/User";
import { Workspace } from "@dbentities/Workspace";
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Relation
} from "typeorm";
import { ComboDeals } from "./ComboDeals";
import { MixDistributors } from "./MixDistributors";
import { ProductsBaseDiscount } from "./ProductsBaseDiscount";

@Entity(EntityEnum.SKU)
export class Product {

    @OneToMany(
      type => ProductsBaseDiscount,
      productsBaseDiscount => productsBaseDiscount.product,
      {
        nullable: true,
        persistence: false,
        onDelete: "NO ACTION"
      }
    )
    productsBaseDiscounts: ProductsBaseDiscount[];

    //   @ManyToMany(() => ComboDeals, comboDeals => comboDeals.products)
    //   combos: Relation<ComboDeals[]>;

    @PrimaryGeneratedColumn({
        name: "id"
    })
    id: number;

    @Column({
        name: "idProduto"
    })
    idProduto: number;

    @Column({
        name: "ean"
    })
    ean: string;

    @Column({
        name: "descricao"
    })
    descricao: string;

    @Column({
        name: "laboratorio"
    })
    laboratorio: string;

    @Column({
        name: "idFamilia"
    })
    idFamilia: number;

    @Column({
        name: "familia"
    })
    familia: string;

    @Column({
        name: "quantidadeMinima"
    })
    quantidadeMinima: number;

    @Column({
        name: "destaque"
    })
    destaque: boolean;

    @Column({
        name: "status"
    })
    status: string;

    @Column({
        name: "menorDataVigencia"
    })
    menorDataVigencia: string;

    @Column({
        name: "quantidade"
    })
    quantidade: number;

    @Column({
        name: "caminhoFoto"
    })
    caminhoFoto?: string;

    @Column({
        name: "idTipoProduto"
    })
    idTipoProduto: number;

    @Column({
        name: "isDemonstraGridPedido"
    })
    isDemonstraGridPedido: boolean;

    @Column({
        name: "workspaceId"
    })
    workspaceId?: number;

    @Column({
        name: "userId"
    })
    userId?: number;

    idProdutoDun: number;
    dun: string;
    quantidadeDun: number;
    Apresentacao: string;
    distributorId: number;

    @ManyToOne(type => Workspace, workspace => workspace.storeRoutes, {
        nullable: true,
        persistence: false,
        onDelete: "NO ACTION"
    })
    @JoinColumn({ name: "workspaceId" })
    workspace: Relation<Workspace>;

    @ManyToOne(type => User, user => user.storeRoutes, {
        nullable: true,
        persistence: false,
        onDelete: "NO ACTION"
    })
    @JoinColumn({ name: "userId" })
    user: Relation<User>;

    @OneToMany(
        type => MixDistributors,
        mixDistributor => mixDistributor.product,
        {
            nullable: true,
            persistence: false,
            onDelete: "NO ACTION"
        }
    )
    mixDistributors: MixDistributors[];
}
