import { Entity, Column, PrimaryColumn } from "typeorm";
import { EntityEnum } from "./EntityEnum";

@Entity(EntityEnum.ORDER_TABLE)
export class OrderTable {
    @PrimaryColumn({
        name: 'id'
    })
	id: number;
	
    @Column({
        name: 'orderBy'
    })
    orderBy: number;
}
