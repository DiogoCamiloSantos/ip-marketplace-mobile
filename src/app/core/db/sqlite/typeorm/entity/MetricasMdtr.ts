
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EntityEnum } from "./EntityEnum";

@Entity(EntityEnum.METRICS_MDTR)
export class MetricasMdtr {
    @PrimaryGeneratedColumn({
        name : "id"
    })

    id?: number;

    @Column({ name: "cnpj"})
    cnpj : string;

    @Column({ name: "ean" })
    ean: string;

    @Column({ name: "dtAno"})
    dtAno: string;

    @Column({ name: "dtMes"})
    dtMes: string;

    @Column({ name: "qtdObjetivo"})
    qtdObjetivo: number;

    @Column({name: "vlrObjetivo"})
    vlrObjetivo: number;

    @Column({ name: "qtdRealizado"})
    qtdRealizado: number;

    @Column({ name: "vlrRealizado"})
    vlrRealizado: number;

    @Column({ name: "vlrMedia"})
    vlrMedia: number;

    @Column({ name: "qtdMedia"})
    qtdMedia: number;

    @Column({ name: "dtObjetivo"})
    dtObjetivo: string;

    @Column({ name: "dtRealizado"})
    dtRealizado: string;
}