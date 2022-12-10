/* eslint-disable no-console */
import * as express from 'express';
import { urlencoded, json } from 'express';
import { processError } from 'middleware/process-error.middleware';
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
app.use(processError);

const init = (): void => {
  try {
    const PORT: number = 4500;
    app.listen(PORT, () => {
      console.log(`---listening port ${PORT}---`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
