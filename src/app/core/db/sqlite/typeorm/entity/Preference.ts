import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';
import { EntityEnum } from './EntityEnum';
import { User } from './User';

@Entity(EntityEnum.PREFERENCE)
export class Preference {
  @PrimaryGeneratedColumn({
    name: 'id'
  })
  id: number;
  
  @Column({
    name: 'chave',
    nullable: false
  })
  chave: string;

  @Column({
    name: 'valor',
    nullable: false
  })
  valor: string;

  @Column({
    name: 'grupo',
    nullable: false
  })
  grupo: string;

  @Column({
    name: 'userId',
    nullable: true 
  })
  userId: number;

  @ManyToOne(type => User, user => user.preferences)
  @JoinColumn({ name: 'userId' })
  user: Relation<User>;
}
