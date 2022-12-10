import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Group } from '../../group/entity/group.entity';
import { Task } from '../../task/entity/task.entity';
import { ROLE } from '../../types/enums';

@Entity({
  name: 'users',
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
    default: ROLE.USER,
  })
    role: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @OneToMany(() => Task, (task) => task.user, {
    cascade: true,
  })
    tasks: Task[];

  @ManyToMany(() => Group, {
    cascade: false,
  })
  @JoinTable({
    name: 'user_group',
  })
    groups: Group[];
}
