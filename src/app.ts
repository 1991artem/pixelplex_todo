/* eslint-disable no-console */
import * as express from 'express';
import * as ws from 'express-ws';
import { urlencoded, json } from 'express';
import { processError, processNotFoundEndpoint, errorHandler } from '@middleware';
import { mountRouter as mountAuthRouter } from '@auth';
import { mountRouter as mountUserRouter } from '@user';
import { mountRouter as mountGroupRouter } from '@group';
import { mountRouter as mountTaskRouter } from '@task';
import { AppDataSource } from './data-source';
import { mountWsRouter } from 'ws/ws.routes';

const app = express();
export const wss = ws(app);

app.use(json());
app.use(urlencoded({ extended: false }));
mountAuthRouter(app);
mountUserRouter(app);
mountGroupRouter(app);
mountTaskRouter(app);
mountWsRouter(wss);

app.use(processNotFoundEndpoint);
app.use(errorHandler);
app.use(processError);

const init = async (): Promise<void> => {
  try {
    const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4500;
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
