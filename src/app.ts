/* eslint-disable no-console */
import express, { urlencoded, json, Response } from 'express';
import config from 'config';
import morgan from 'morgan';
import colors from 'colors';
import cors from 'cors';

import AuthRouter from './Auth/auth.routes';

export default class App {
  private app = express();
  private PORT: number | string = process.env.PORT ?? config.get('PORT');

  private authRouter: AuthRouter = new AuthRouter();
  lesten():void {
    this.app.listen(this.PORT, () => { // listen to port numbers
      console.log(colors.bgGreen.bold(`---listening port ${this.PORT}---`));
    });
  }
  modules():void {
    this.app.use(json());
    this.app.use(cors());
    this.app.use(urlencoded({ extended: false }));
    this.app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));

    this.app.use(this.authRouter.authRouter()); // auth routes

    this.app.use((error: { message: any; data: any; statusCode: any; }, _req: any, res: Response, _next: any) => {
      const { message, data, statusCode } = error;
      if (!statusCode || statusCode >= 500) {
        console.error(error);
      }
      res.status(statusCode || 500).json({ message, data, statusCode });
    });
  };
}
