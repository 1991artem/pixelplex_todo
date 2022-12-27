/* eslint-disable no-console */
import * as express from 'express';
import * as ws from 'express-ws';
import { urlencoded, json } from 'express';
import { processNotFoundEndpoint, errorHandler } from '@middleware';
import { mountRouter as mountAuthRouter } from '@auth';
import { mountRouter as mountUserRouter } from '@user';
import { mountRouter as mountGroupRouter } from '@group';
import { mountRouter as mountTaskRouter } from '@task';
import { mountWsRouter } from 'ws/ws.routes';
import { config } from 'config';
import { AppDataSource } from './data-source';

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

const init = async (): Promise<void> => {
  try {
    const PORT: number = config.DEV.PORT;
    await AppDataSource.initialize();
    app.listen(PORT, () => {
      console.log(`---listening port ${PORT}---`);
    });
    console.info('Successfully connected');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
