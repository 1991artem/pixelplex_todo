import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import "reflect-metadata";
import { Group } from './group/entity/Group';
import { Task } from './task/entity/Task';
import { User } from './user/entity/User';

dotenv.config();

const user = process.env.DB_USER as string;
const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME as string;
const password = process.env.DB_PASSWORD as string;
const port = Number(process.env.DB_PORT) || 5432;


export const AppDataSource = new DataSource({
  type: "postgres",
  host: host,
  port: port,
  username: user,
  password: password,
  database: database,
  synchronize: true,
  logging: false,
  entities: [User, Group, Task],
  subscribers: [],
  migrations: [],
})
