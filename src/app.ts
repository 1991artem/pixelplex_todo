/* eslint-disable no-console */
import * as express from 'express';
import { urlencoded, json } from 'express';
import * as cookieParser from 'cookie-parser';
import { AppDataSource } from './data-source';
import { processError, processNotFoundEndpoint, errorHandler } from '@middleware';
import { mountRouter as mountAuthRouter } from '@auth';
import { mountRouter as mountUserRouter } from '@user';
import { mountRouter as mountGroupRouter } from '@group';
import { mountRouter as mountTaskRouter } from '@task';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
mountAuthRouter(app);
mountUserRouter(app);
mountGroupRouter(app);
mountTaskRouter(app);

app.use(processNotFoundEndpoint);
app.use(errorHandler);
app.use(processError);

const init = async (): Promise<void> => {
  try {
    const PORT: number = Number(process.env.PORT) | 4500;
    const DB: string | undefined = process.env.DB_NAME;
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`---listening port ${PORT}---`);
    });
    console.info(`Successfully connected to ${DB}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
