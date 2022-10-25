import { Response } from 'express';
import { ServerMessage } from '../helps/interfaces';

export const serverMessage: ServerMessage = (res: Response, code: number, { errors, message }): void => {
  res.status(code || 500)
    .json({ errors: errors, message: message });
};

