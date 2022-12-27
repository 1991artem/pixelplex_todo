export interface IUserAuthInfoInRequest {
  token: string;
  role: string;
  id: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: IUserAuthInfoInRequest;
    }
  }
}
