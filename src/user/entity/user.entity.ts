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
import { USER_ROLE } from 'user/constants';
import { Group } from '../../group/entity/group.entity';
import { Task } from '../../task/entity/task.entity';

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
    enum: USER_ROLE,
    default: USER_ROLE.USER,
  })
    role: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @OneToMany(() => Task, (task: Task) => task.user, { eager: true, cascade: true})
    tasks: Task[];

  @ManyToMany(() => Group)
  @JoinTable({
    name: 'user_group',
  })
    groups: Group[];
}
