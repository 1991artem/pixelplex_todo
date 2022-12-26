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

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}
