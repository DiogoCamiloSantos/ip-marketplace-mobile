import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityEnum } from "./EntityEnum";

@Entity(EntityEnum.SKU_FILTERS)
export class Filters {
    @PrimaryGeneratedColumn({
        name: "id"
    })
    id?: number;

    @Column({ name: 'ativo'})
    ativo: boolean;

    @Column({ name : 'codigo'})
    codigo: string;

    @Column({ name: 'descricao'})
    descricao : string;

    @Column({ name: 'descricaoCategoria'})
    descricaoCategoria: string;

    @Column({ name: 'icone'})
    icone: string;

    @Column({ name: 'idCategoriaFiltroPersonalizado'})
    idCategoriaFiltroPersonalizado: number;

    @Column({ name: 'idFiltroPersonalizado'})
    idFiltroPersonalizado: number;

    @Column({ name: 'idProduto'})
    idProduto:number
}