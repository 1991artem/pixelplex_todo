# TODOS PROJECT

## API

### 1.DTO

- ErrorDTO:

  ```TypeScript
  {
    status: number,
    message: string,
    details?: any,
  }
  ```

### 2. AUTH

- `POST api/v1/auth/signup` - эндпоинт для создания пользователя. Доступен для всех ролей. Ожидает следующее тело запроса:

  ```TypeScript
  {
    name: string,
    password: string,
    email: string,
  }
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    id: number,
    message: "User has been created",
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  422('User with this email already exists')
  ```

- `POST api/v1/auth/login` - эндпоинт для входа в систему. Доступен для всех ролей. Ожидает следующее тело запроса:

  ```TypeScript
  {
    password: string,
    email: string,
  }
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    token: string,
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  404('Not Found')
  ```

- `POST api/v1/auth/logout` - эндпоинт для выхода из системы. Доступен для всех ролей.

### 3. GROUP API

- `POST api/v1/group/create` - эндпоинт для создания группы. Доступен для ролей: `['admin']`. Ожидает следующее тело запроса:

  ```TypeScript
  {
    name: string,
    description: string,
  }
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    id: number,
    message: "Group has been created",
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  422('Group with this name already exists')
  ```

- `GET api/v1/group/all` - эндпоинт для получения списка всех групп. Доступен для ролей: `['admin']`. Ожидает следующие параметры:

  ```TypeScript
    pagination['limit']?: string,
    pagination['offset']?: string,
    sort[type]?: 'asc' | 'desc'
    sort[field]?: 'date' | 'name'
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    amount: number,
    groups:
      [
        {
          id: number,
          name: string,
          description: string,
          createdAt: Date,
          usersAmount: number
        }
      ]
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden')
  ```

- `GET api/v1/group/:id` - эндпоинт для получения одной группы по ID. Доступен для ролей: `['admin']`.

  Возвращает следующий DTO:

  ```TypeScript
  {
    id: number,
    name: string,
    description: string,
    createdAt: Date,
    users: 
      [
        {
          id: number,
          name: string,
          role: 'user' | 'admin',
          email: string,
        }
      ],
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  404('Not Found')
  ```

- `DELETE api/v1/group/:id` - эндпоинт для удаления одной группы по ID. Доступен для ролей: `['admin']`.

  Возвращает следующий DTO:

  ```TypeScript
  {
    message: "Group has been deleted"
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  404('Not Found')
  ```

- `PATCH api/v1/group/:id`- эндпоинт для редактирования одной группы по ID. Доступен для ролей: `['admin']`. Ожидает следующее тело запроса:

  ```TypeScript
  {
    name?: string,
    description?: string,
  }
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    message: "Group has been updated"
    group: {
        id: number,
        name: string,
        description: string,
    }
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  404('Not Found')
  ```

- `POST api/v1/group/add-user` - эндпоинт для добавления пользователя в группу. Доступен для ролей: `['admin']`. Ожидает следующее тело запроса:

  ```TypeScript
  {
    userId: number,
    groupId: number,
  }
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    message: "The user has been added to the group"
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  404('Not Found')
  ```

- `POST api/v1/group/remove-user` - эндпоинт для удаления пользователя из группы. Доступен для ролей: `['admin']`. Ожидает следующее тело запроса:

  ```TypeScript
  {
    userId: number,
    groupId: number,
  }
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    message: "The user has been removed from the group"
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  404('Not Found')
  ```

### 4. USER API

- `GET api/v1/user/:id/statistics` - эндпоинт для получения статистики пользователя по ID, находящегося в одних группах с user. Доступен для ролей: `['user', 'admin']`.

  Возвращает следующий DTO:

  ```TypeScript
  {
    to_do: {
        overdue: number,
        total: number;
    },
    in_progress: {
        overdue: number,
        total: number
    },
    done: number,
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  404('Not Found')
  ```

### 5. TASK API

- `POST api/v1/task/create` - эндпоинт для создания задачи. Доступен для ролей: `['user', 'admin']`. Ожидает следующее тело запроса:

  ```TypeScript
  {
    name: string,
    description: string,
    status: 'to do' | 'in progress' | 'done',
    deadline: Date,
    priority: 'low' | 'normal' | 'high',
  }
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    id: number,
    message: 'Task has been created',
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  422('Date is expired')
  ```

- `GET api/v1/task/all` - эндпоинт для получения списка задач пользователя или списка задач пользователей в группах (при условии, что пользователи состоят в той же группе с user). Доступен для ролей: `['user','admin']`. Ожидает следующие параметры:

  ```TypeScript
    includeGroupmatesTasks?: boolean,
    pagination['limit']?: string,
    pagination['offset']?: string,
    sort[type]?: 'asc' | 'desc'
    sort[field]?: 'date' | 'name'
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    amount: number,
    tasks:
      [
        {
          id: number,
          name: string,
          description: string,
          status: 'to do' | 'in progress' | 'done',
          deadline: Date,
          priority: 'low' | 'normal' | 'high',
          ownerId: number,
        }
      ]
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized')
  ```

- `PATCH api/v1/task/:id` - эндпоинт для редактирования задачи по ID. Доступен для ролей: `['user', 'admin']`. Ожидает следующее тело запроса:

  ```TypeScript
  {
    name?: string,
    description?: string,
    status?: 'to do' | 'in progress' | 'done',
    deadline?: Date,
    priority?: 'low' | 'normal' | 'high',
  }
  ```

  Возвращает следующий DTO:

  ```TypeScript
  {
    message: 'Task has been updated',
    task: {
      id: number,
      name: string,
      description: string,
      status: 'to do' | 'in progress' | 'done',
      deadline: Date,
      priority: 'low' | 'normal' | 'high',
    }
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  404('Not Found'),
  422('Date is expired')
  ```

- `DELETE api/v1/task/:id` - эндпоинт для удаления задачи по ID. Доступен для ролей: `['user','admin']`.

  Возвращает следующий DTO:

  ```TypeScript
  {
    message: "Task has been deleted"
  }
  ```

  Возможные коды ошибок:

  ```TypeScript
  400('Bad Request'),
  401('Unauthorized'),
  403('Forbidden'),
  404('Not Found')
  ```
