export type CreateUserBody = {
  name: string;
  password: string;
  email: string;
};

export type UserAuthBody = {
  password: string;
  email: string;
};
