import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityEnum } from './EntityEnum';

@Entity(EntityEnum.COMBO_DEALS_PRODUCTS)
export class ComboDealsProducts {
    @PrimaryGeneratedColumn({
      name: "id"
    })
    id: number;
  
    @Column({
        name: 'comboDealsId'
    })
    comboDealsId: number;

    @Column({
        name: 'productId'
    })
    productId: number;

    @Column({
        name: 'productDunId'
    })
    productDunId: number;
    
    @Column({
        name: 'preco'
    })
    preco: number;

    @Column({
        name: 'quantidade'
    })
    quantidade: number;
    
    @Column({
        name: 'quantidadeDunUnidade'
    })
    quantidadeDunUnidade: number;

    @Column({
        name: 'desconto'
    })
    desconto: number;

    @Column({
        name: 'precoLiquido'
    })
    precoLiquido: number;
}