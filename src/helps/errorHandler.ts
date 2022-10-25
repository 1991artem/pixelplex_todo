/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Response } from 'express';
import chalk from 'chalk';
import { ServerMessage } from '../helps/interfaces';

export const serverMessage: ServerMessage = (res: Response, code: number, { errors, message }): void => {
  if (!code) {
    console.log(chalk.red.bold(`\n${message}\n`));
  }
  res.status(code || 500)
    .json({ errors: errors, message: message });
};

