import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation} from 'typeorm';
import {Synchronization} from '@models/syncronization';
import {EntityEnum} from './EntityEnum';
import {User} from './User';
import {Workspace} from './Workspace';
import {StatusSyncronization} from '@models/enum';
import TypeSync = Synchronization.TypeSync;

@Entity(EntityEnum.SYNCRONIZATION)
export class Syncronization {
    @PrimaryGeneratedColumn({
        name: 'id'
    })
    id: number;

    @Column({
        name: 'json'
    })
    json: string;

    @Column({
        name: 'transaction_key'
    })
    transaction_key: string;

    @Column({
        name: 'status'
    })
    status: StatusSyncronization;

    @Column({
        name: 'step'
    })
    step: number;

    @Column({
        name: 'userId'
    })
    userId: string;

    @Column({
        name: 'response'
    })
    response: string;

    @Column({
        name: 'workspaceId'
    })
    workspaceId: number;

    @Column({
        name: 'idUser'
    })
    idUser: number;

    @Column({
        name: 'type'
    })
    type: TypeSync;

    @ManyToOne(type => User, user => user.syncronizations)
    @JoinColumn({name: 'idUser'})
    user: Relation<User>;

    @ManyToOne(type => Workspace, workspace => workspace.user)
    @JoinColumn({name: 'workspaceId'})
    workspace: Relation<Workspace>;
}
