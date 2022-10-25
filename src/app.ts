/* eslint-disable no-console */
import express, { urlencoded, json } from 'express';
import config from 'config';
import morgan from 'morgan';
import chalk from 'chalk';
import cors from 'cors';

import AuthApi from './routes/auth.routes';

export default class App {
  private app = express();
  private PORT: number | string = process.env.PORT ?? config.get('PORT');

  private auth: AuthApi = new AuthApi();
  lesten():void {
    this.app.listen(this.PORT, () => { // listen to port numbers
      console.log(chalk.bgCyanBright.bold(`---listening port ${this.PORT}---`));
    });
  }
  modules():void {
    this.app.use(json());
    this.app.use(cors());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    this.app.use(this.auth.authRouter()); // auth routes
  };
}
