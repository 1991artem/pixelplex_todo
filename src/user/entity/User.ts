import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Group } from "../../group/entity/Group";
import { ROLE } from '../../helps/enums';
import { Task } from "../../task/entity/Task";

@Entity({
  name: 'users'
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({ 
    enum: ROLE,
    default: ROLE.USER
  })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Task, (task) => task.owner)
  tasks: Task[]

  @ManyToMany(() => Group, (group)=> group.users)
  @JoinTable({
    name: "user_group",
    joinColumn: {
        name: "userId",
    },
    inverseJoinColumn: {
        name: "groupId",
    },
  })
  groups: Group[]
}
