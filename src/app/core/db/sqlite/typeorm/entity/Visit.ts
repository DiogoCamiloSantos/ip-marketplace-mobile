import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation
} from "typeorm";
import { EntityEnum } from "./EntityEnum";
import { Store } from "./Store";
import { Workspace } from "./Workspace";
import { User } from "./User";
import { ImageContent } from "@models/image-content";

@Entity(EntityEnum.VISIT)
export class Visit {
  @PrimaryGeneratedColumn({
    name: "id"
  })
  id: number;

  @Column({
    name: "dateStart"
  })
  dateStart: Date;

  @Column({
    name: "dateEnd",
    nullable: true
  })
  dateEnd: Date;

  @Column({
    name: "status",
    nullable: true
  })
  status: number;

  @Column({
    name: "reasonNotVisit",
    nullable: true
  })
  reasonNotVisit: number;

  @Column({
    name: "period",
    nullable: true
  })
  period: number;

  @Column({
    name: "accompaniedVisit",
    nullable: true
  })
  accompaniedVisit: number;

  @Column({
    name: "typeVisit",
    nullable: true
  })
  typeVisit: number;

  @Column({
    name: "companion",
    nullable: true
  })
  companion: string

  @Column({
    name: "observations",
    nullable: true
  })
  observations: string;

  @Column({
    name: "nextVisit",
    nullable: true
  })
  nextVisit: string;

  @Column({
    name: "IdPdv",
    nullable: true
  })
  IdPdv: number;

  @Column({
    name: "IdRota",
    nullable: true
  })
  IdRota: number;

  @Column({
    name: "IdRoteiro",
    nullable: true
  })
  IdRoteiro: number;

  @Column({
    name: "IdDestino",
    nullable: true
  })
  IdDestino: number;

  @Column({
    name: "IdOrigem",
    nullable: true
  })
  IdOrigem: number;

  @Column({
    name: "Ordem",
    nullable: true
  })
  Ordem: number;

  @Column({
    name: "sync",
    nullable: false,
    default: 0
  })
  sync: boolean;

  @Column({
    name: "sent",
    nullable: false,
    default: 0
  })
  sent: boolean;

  @Column({
    name: "storeId"
  })
  storeId: number;

  @Column({
    name: "latitudeCheckIn",
    nullable: true
  })
  latitudeCheckIn: number;

  @Column({
    name: "longitudeCheckIn",
    nullable: true
  })
  longitudeCheckIn: number;

  @Column({
    name: "latitudeCheckOut",
    nullable: true
  })
  latitudeCheckOut: number; 

  @Column({
    name: "longitudeCheckOut",
    nullable: true
  })
  longitudeCheckOut: number;

  @Column({
    name: "authorizedSend",
    nullable: false,
    default: 0
  })
  authorizedSend: boolean;

  @Column({
    name: "workspaceId"
  })
  workspaceId: number;

  @Column({
    name: "userId"
  })
  userId: number;

  @Column({
    nullable: true,
    name: "images"
  })
  images: string;

  imagesContent: ImageContent[];

  @ManyToOne(type => Store, store => store.visits)
  @JoinColumn({ name: "storeId" })
  store: Relation<Store>;

  @ManyToOne(type => Workspace, workspace => workspace.visits)
  @JoinColumn({ name: "workspaceId" })
  workspace: Relation<Workspace>;

  @ManyToOne(type => User, user => user.visits)
  @JoinColumn({ name: "userId" })
  user: Relation<User>;
}
