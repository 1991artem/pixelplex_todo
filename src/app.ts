/* eslint-disable no-console */
import express, { urlencoded, json } from 'express';

import { mountRouter as mountAuthRouter } from './auth/auth.routes';
import { mountRouter as mountUserRouter } from './user/user.routes';
import { mountRouter as mountGroupRouter } from './group/group.routes';
import { mountRouter as mountTaskRouter } from './task/task.routes';
import { processNotFoundEndpoint } from './middleware/not-found.middleware';

  const app = express();
  
  const PORT: number = 4500;

  const init = async(): Promise<void> => {
    app.listen(PORT, () => { // listen to port numbers
      console.log(`---listening port ${PORT}---`);
    });
  }

    app.use(json());
    app.use(urlencoded({ extended: false }));

    mountAuthRouter(app);
    mountUserRouter(app);
    mountGroupRouter(app);
    mountTaskRouter(app);

    app.use(processNotFoundEndpoint);

    init()
