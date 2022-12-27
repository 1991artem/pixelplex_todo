import { DataSource } from 'typeorm';
import 'reflect-metadata';
import { config } from 'config';

export const AppDataSource = new DataSource(config.DEV.DB);
