import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const user = process.env.DB_USER as string;
const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME as string;
const password = process.env.DB_PASSWORD as string;
const port = Number(process.env.DB_PORT) || 5432;

const sequelize =  new Sequelize(
  database,
  user,
  password,
    {
        dialect: 'postgres',
        host: host,
        port: port
    }
)

export default sequelize;