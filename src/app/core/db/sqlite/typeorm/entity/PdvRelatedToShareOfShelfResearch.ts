import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EntityEnum } from './EntityEnum';
import { ResearchShareOfShelf } from './ResearchShareOfShelf';
import { ShareOfShelf } from './ShareOfShelf';
import { Store } from './Store';
import { StoreRoute } from './StoreRoute';
import { User } from './User';
import { Workspace } from './Workspace';

@Entity(EntityEnum.PDV_RELATED_TO_SHARE_OF_SHELF_RESEARCH)
export class PdvRelatedToShareOfShelfResearch {

    @PrimaryGeneratedColumn({
        name: 'pdvRelacionadoId'
    })
    pdvRelatedId?: number;

    @Column({
        name: 'idPdv'
    })
    storeId: number;

    @Column({
        name: 'idPesquisa'
    })
    researchId: number;

    @Column({
        name: 'idRota'
    })
    routeId?: number;

    @Column({
        name: 'respondida'
    })
    public answered?: boolean;
    
    @OneToMany(type => ShareOfShelf, shareOfShelf => shareOfShelf.pdvRelatedToSearch)
    productsShare?: ShareOfShelf[];

    @ManyToOne(type => User, user => user.PdvRelatedToSearch, {
        nullable: true,
        persistence: false,
        onDelete: 'NO ACTION'
    })
    @JoinColumn({name: 'userId'})
    user: Relation<User>;

    @ManyToOne(type => Workspace, workspace => workspace.PdvRelatedToSearch, {
        nullable: true,
        persistence: false,
        onDelete: 'NO ACTION'
    })
    @JoinColumn({name: 'workspaceId'})
    workspace: Relation<Workspace>;
    
    @ManyToOne(type => ResearchShareOfShelf, research => research.pdvRelatedResearchShareOfShelf, {
        nullable: true,
        persistence: false,
        onDelete: 'NO ACTION'
    })
    @JoinColumn({name: 'idPesquisa'})
    research?: ResearchShareOfShelf;
}
