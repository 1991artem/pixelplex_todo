import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TASK_PRIORITY, TASK_STATUS } from 'task/constants';
import { User } from '../../user/entity/user.entity';

@Entity({
  name: 'tasks',
})
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({
    unique: true,
  })
    name: string;

  @Column({
    nullable: true,
  })
    description: string;

  @Column({
    type: "enum",
    enum: TASK_STATUS,
    default: TASK_STATUS.TO_DO,
  })
    status: TASK_STATUS;

  @Column()
    deadline: Date;

  @Column({
    type: "enum",
    nullable: true,
    enum: TASK_PRIORITY
  })
    priority: TASK_PRIORITY;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => User, (user: User) => user.tasks)
    user: User;
}
