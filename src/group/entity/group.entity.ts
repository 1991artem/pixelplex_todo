import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';

@Entity({
  name: 'groups',
})
export class Group extends BaseEntity {
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

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @ManyToMany(() => User, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_group',
  })
    users: User[];
}
