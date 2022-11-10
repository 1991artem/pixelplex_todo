import colors from 'colors';
import { AppDataSource } from './data-source';

export default class Connect {
  private db: string = process.env.DB_NAME as string; // mongo uri (from config files)
  async connection(): Promise<void> { // connect to database (Mongoose)
    try {
      await AppDataSource.initialize();
      console.info(colors.green.bold(`Successfully connected to ${this.db}`));
  } catch (error) {
    console.error('Error connecting to database: ', error);
    process.exit(1);
  }
  }
}
