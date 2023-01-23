import { ImageContent } from '@models/image-content';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EntityEnum } from './EntityEnum';
import { PdvRelatedToShareOfShelfResearch } from './PdvRelatedToShareOfShelfResearch';
import { User } from './User';
import { Workspace } from './Workspace';

@Entity(EntityEnum.SHARE_OF_SHELF)
export class ShareOfShelf {

    constructor(private init?: Partial<ShareOfShelf>) {
        Object.assign(this, init);
    }

    @PrimaryGeneratedColumn({
        name: 'id'
    })
    public id?: number;

    @Column({
        name: 'apresentacao'
    })
    public presentation?: string;

    @Column({
        name: 'shareIdeal'
    })
    public idealShare?: number;

    @Column({
        name: 'shareCalculado'
    })
    public calculatedShare?: number;

    @Column({
        name: 'facingGondola',
    })
    public facingShelf?: number = 0;
    
    @Column({
        name: 'facingProduto'
    })
    public facingProduct?: number = 0;
    
    @Column({
        name: 'foto'
    })
    public photo?: string;

    @Column({
        name: 'idPesquisaProduto'
    })
    public searchProductId?: number;
    
    @Column({
        name: 'idPesquisa'
    })
    public searchId?: number;
    
    @Column({
        name: 'idProduto'
    })
    public productId?: number;
    
    @Column({
        name: 'produto'
    })
    public product?: string;
    
    @Column({
        name: 'idFamilia'
    })
    public familyId?: number;
    
    @Column({
        name: 'familia'
    })
    public family?: string;
    
    @Column({
        name: 'tipoApuracao'
    })    
    public calculationType?: CalculationType;
    
    @Column({ 
        name: "idRota" 
    })
    routeId?: number;
    
    get calculationTypeDescription() {
        if (this.calculationType === 1)
            return "Foto";
        if (this.calculationType === 2)
            return "Manual";

        return '';
    }
    
    public imageContent?: ImageContent;

    @ManyToOne(type => User, user => user.shareOfShelf)
    @JoinColumn({ name: "userId" })
    user?: Relation<User>;

    @ManyToOne(type => Workspace, workspace => workspace.shareOfShelf)
    @JoinColumn({ name: "workspaceId" })
    workspace?: Relation<Workspace>;

    @ManyToOne(() => PdvRelatedToShareOfShelfResearch)
    @JoinColumn({ name: "pdvRelacionadoId" })
    pdvRelatedToSearch?: Relation<PdvRelatedToShareOfShelfResearch>;
}

export enum CalculationType {
    NotCalculated = 0,
    Photo = 1,
    Manual = 2
}
