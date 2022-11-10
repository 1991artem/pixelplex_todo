# TODOS

## ENTITIES

### 1. USER

  ```TypeScript
  id: number,
  name: string,
  password: string,
  email: string,
  role: ROLE,
  createdAt: Date,
  updatedAt: Date,
  ```

### 2. GROUP

  ```TypeScript
  id: number,
  name: string,
  description: string,
  createdAt: Date,
  updatedAt: Date,
  ```

### 3. TASK

  ```TypeScript
  id: number,
  name: string,
  description: string,
  status: TASK_STATUS,
  deadline: Date,
  priority: TASK_PRIORITY,
  userId: number,
  createdAt: Date,
  updatedAt: Date,
  ```

### 4. USERGROUP

  ```TypeScript
  userId: number,
  groupId: number,
  ```

### ENUMS

  ```TypeScript
enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}
  ```

  ```TypeScript
enum TASK_STATUS {
  TO_DO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}
  ```

  ```TypeScript
enum TASK_PRIORITY {
  LOW = 'low',
  NORMAL = 'normal',
  HIGH = 'high',
}
  ```

### RELATIONS

  ```TypeScript
  1. User - Task: one-to-many relation;
  User.id(PK) - Task.ownerId(FK);

  2. User - [UserGroup] - Group: many-to-many relation;
  Group.id(PK) - [Group.id(FK), User.id(FK)] - User.id(PK);
  ```
