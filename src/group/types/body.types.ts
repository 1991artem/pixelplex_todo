export type CreateGroupBody = {
  name: string,
  description?: string,
};

export type UserInGroupBody = {
  userId: number;
  groupId: number;
};

export type UpdateGroupBody = Partial<CreateGroupBody>;
