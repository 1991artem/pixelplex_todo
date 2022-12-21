export interface IUserAuthInfoInRequest {
  token: string;
  role: string;
  userId: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: IUserAuthInfoInRequest;
    }
  }
}
