import { ServerMessage} from '../helps/interfaces';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const serverMessage = (res, status, { errors = [], message}): ServerMessage =>{
  return res.status(status).json({ message: message });
}


export  {serverMessage}