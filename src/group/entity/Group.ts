import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import {User} from '../../user/entity/User';

@Entity({
  name: 'groups'
})
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    nullable: true
  })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => User, (user)=> user.groups)
  @JoinTable({
    name: "user_group",
    joinColumn: {
        name: "groupId",
    },
    inverseJoinColumn: {
        name: "userId",
    },
  })
  users: User[]
}
