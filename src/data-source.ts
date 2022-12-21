import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { User } from '@user';
import { Group } from '@group';
import { Task } from '@task';
import * as Migrations from './migrations';

dotenv.config();

const user = process.env.DB_USER as string;
const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME as string;
const password = process.env.DB_PASSWORD as string;
const port = Number(process.env.DB_PORT) || 5432;

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