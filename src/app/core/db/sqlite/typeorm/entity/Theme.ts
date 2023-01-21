import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EntityEnum } from './EntityEnum';
import { Workspace } from './Workspace';

@Entity(EntityEnum.THEMES)
export class Theme {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'name'
    })
    name: string;

    @Column({
        name: 'colorA'
    })
    colorA: string;

    @Column({
        name: 'colorB'
    })
    colorB: string;

    @Column({
        name: 'colorC'
    })
    colorC: string;

    @Column({
        name: 'colorD'
    })
    colorD: string;

    @Column({
        name: 'colorFont'
    })
    colorFont: string;

    @OneToOne(type => Workspace, workspace => workspace.theme)
    workspace: Relation<Workspace>;
}
