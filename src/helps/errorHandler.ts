import { Response } from 'express';
import { ServerMessage } from '../helps/interfaces';

type message = {
  message: string;
};

const serverMessage: ServerMessage = (res: Response, code: number, { message }:message): void => {
  res.status(code).json({ message: message });
};

export { serverMessage };
