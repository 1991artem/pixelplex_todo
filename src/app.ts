/* eslint-disable no-console */
import express, { urlencoded, json } from 'express';

import { mountRouter as mountAuthRouter } from './auth/auth.routes';
import { mountRouter as mountUserRouter } from './user/user.routes';
import { mountRouter as mountGroupRouter } from './group/group.routes';
import { mountRouter as mountTaskRouter } from './task/task.routes';
import { processNotFoundEndpoint } from './middleware/not-found.middleware';
import errorHandler from './middleware/error-handler.middleware';

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));

mountAuthRouter(app);
mountUserRouter(app);
mountGroupRouter(app);
mountTaskRouter(app);

app.use(processNotFoundEndpoint);
app.use(errorHandler);

const init = async(): Promise<void> => {
  const PORT: number = 4500;
  app.listen(PORT, () => {
    console.log(`---listening port ${PORT}---`);
  });
};

init();
