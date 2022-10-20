/* eslint-disable no-console */
import { connect, connection } from 'mongoose';
import chalk from 'chalk';
import { IConnectOptions } from './helps/interfaces';

export default class Connect {
  private db: string = process.env.MONGO_URI || ''; // mongo uri (from config files)
  private connectOptions: IConnectOptions = { // default connection options
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  start():void {
    this.connection();
    connection.on('disconnected', connect);
  }

  async connection(): Promise<void> { // connect to database (Mongoose)
    await connect( this.db, this.connectOptions)
      .then(() => {
        console.info(chalk.green.bold(`Successfully connected to ${this.db}`));
      })
      .catch(error => {
        console.error('Error connecting to database: ', error);
        process.exit(1);
      });
  }
}
