export interface IUserAuthInfoInRequest {
  token: string;
  role: string;
  id: string;
};

declare global {
  namespace Express {
    export interface Request<T extends Query, U> {
      body?: U;
      query?: T;
      user?: IUserAuthInfoInRequest;
    }
  }
}
