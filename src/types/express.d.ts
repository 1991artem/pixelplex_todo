import { USER_ROLE } from './../user/constants/user.constants';

export interface IUserAuthInfoInRequest {
  role: USER_ROLE;
  id: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: IUserAuthInfoInRequest;
    }
  }
}
