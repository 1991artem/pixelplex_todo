export interface IUser {
  username: string;
  email: string;
  password: string;
  admin: boolean;
  task: []
}

export interface ITask {
  name: string;
  discription: string;
  deadline: string;
  priority: string;
  status: string;
}