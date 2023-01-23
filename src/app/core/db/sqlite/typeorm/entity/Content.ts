import {
  Column,
  Entity,
  PrimaryGeneratedColumn
} from "typeorm";
import { EntityEnum } from "./EntityEnum";

@Entity(EntityEnum.CONTENT)
export class Contents {

  @PrimaryGeneratedColumn({
    name: "FileId"
  })
  FileId: number;

  @Column({
    name: "FileName"
  })
  FileName: string

  @Column({
    name: "StartDate"
  })
  StartDate: Date;

  @Column({
    name: "EndDate",
  })
  EndDate: Date;

  @Column({
    name: "Description",
  })
  Description: string;

  @Column({
    name: "FileVirtualPath",
  })
  FileVirtualPath: string;

  @Column({
    name: "ContentType",
  })
  ContentType: string;

  @Column({
    name: "Validity",
  })
  Validity: boolean;

  @Column({
    name: "IsDeleted",
  })
  IsDeleted: boolean;

  @Column({
    name: "RoleId",
    nullable: true
  })
  RoleId: string;

  @Column({
    name: "Roles",
    nullable: true
  })
  Roles: string;
}
