import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import 'reflect-metadata';
import { Group } from '../group';
import { Task } from '../task';
import { User } from '../user';

dotenv.config();

const user = 'postgres';
const host = 'localhost';
const database = 'test';
const password = 'root';
const port = 8000;

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
});
