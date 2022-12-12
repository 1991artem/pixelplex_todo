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
    enum: TASK_STATUS,
    default: TASK_STATUS.TO_DO,
  })
    status: string;

  @Column()
    deadline: Date;

  @Column({
    enum: TASK_PRIORITY,
    default: TASK_PRIORITY.HIGH,
  })
    priority: string;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}
