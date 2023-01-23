import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
        name: 'productDunId',
        nullable: true
    })
    productDunId: number;
    
    @Column({
        name: 'preco',
        type: 'real',
        nullable: true
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
        name: 'precoLiquido',
        type: 'real',
    })
    precoLiquido: number;
}