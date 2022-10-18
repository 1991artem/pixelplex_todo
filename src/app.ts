/* eslint-disable no-console */
import express, { urlencoded, json } from 'express';
import config from 'config';
import morgan from 'morgan';
import chalk from 'chalk';
import methodOverride from 'method-override';
import AuthApi from './routes/auth.routes';
import UserApi from './routes/user.routes';
import GroupApi from './routes/group.routes';
import TaskApi from './routes/task.routes';

export default class App {
  private app = express();
  private PORT: number = config.get('PORT') || 4200;
  private link: string = config.get('apiLink');
  private auth: AuthApi = new AuthApi();
  private user: UserApi = new UserApi();
  private group: GroupApi = new GroupApi();
  private task: TaskApi = new TaskApi();
  listan():void {
    this.app.listen(this.PORT, () => { // listen to port numbers
      console.log(chalk.bgCyanBright.bold(`---listening port ${this.PORT}---`));
    });
  }
  midleware():void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(methodOverride('_method'));
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    this.app.use(this.link, this.auth.authRouter()); // auth routes
    this.app.use(this.link, this.user.userRouter()); // user routes
    this.app.use(this.link, this.group.groupRouter()); // group routes
    this.app.use(this.link, this.task.taskRouter()); // task routes
  }
}