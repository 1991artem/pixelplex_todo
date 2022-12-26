export interface CreateGroupDTO {
  name: string;
  description: string;
};

export interface UserInGroupDTO {
  userId: number;
  groupId: number;
};
