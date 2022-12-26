import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { User } from './user/entity/user.entity';
import { Group } from './group/entity/group.entity';
import { Task } from './task/entity/task.entity';
import * as Migrations from './migrations';

dotenv.config();

const user = process.env.DB_USER;
const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME;
const password = process.env.DB_PASSWORD;
const port = Number(process.env.DB_PORT) || 5432;

if (!user || !database || !password) {
  throw new Error('DB_USER, DB_NAME, DB_PASSWORD not set');
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: host,
  port: port,
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [User, Group, Task],
  migrations: Object.values(Migrations),
  migrationsTableName: 'migration_list_table',
});
