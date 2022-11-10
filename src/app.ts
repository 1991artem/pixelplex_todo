/* eslint-disable no-console */
import express, { urlencoded, json } from 'express';
import config from 'config';
import morgan from 'morgan';
import colors from 'colors';
import cors from 'cors';

import { authModule}  from './auth/auth.routes';
import errorHandler from './middleware/error-handler.middleware';
import { userModule } from './user/user.routes';
import { groupModule } from './group/group.routes';
import { taskModule } from './task/task.routes';
import { processNotFoundEndpoint } from './middleware/not-found.middleware';

export default class App {
  private app = express();
  
  private PORT: number | string = process.env.PORT ?? config.get('PORT');
  private apiUrl = '/api/v1'

  listen():void {
    this.app.listen(this.PORT, () => { // listen to port numbers
      console.log(colors.bgGreen.bold(`---listening port ${this.PORT}---`));
    });
  }
  modules():void {
    this.app.use(json());
    this.app.use(cors());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    this.app.use(this.apiUrl, authModule.injecting());
    this.app.use(this.apiUrl, userModule.injecting());
    this.app.use(this.apiUrl, groupModule.injecting());
    this.app.use(this.apiUrl, taskModule.injecting());

    this.app.use(processNotFoundEndpoint);
    this.app.use(errorHandler);
  };
}
