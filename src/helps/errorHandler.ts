/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import { ValidationError } from 'express-validator';
import { ServerMessage } from '../helps/interfaces';

const serverMessage: ServerMessage = (res: Response, code: number, { errors, message }): void => {
  res.status(code).json({ errors: errors,message: message });
};

export { serverMessage };
