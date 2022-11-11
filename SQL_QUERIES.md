# TODOS

## SQL QUERIES

```sql
CREATE DATABASE sql_todos_db;
```

```sql
CREATE TABLE users
  (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    role VARCHAR(30) DEFAULT USER,
    createdAt DATE DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
  )
```

```sql
CREATE TABLE groups
  (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(30) NOT NULL,
    createdAt DATE DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
  )
```

```sql
CREATE TABLE tasks
  (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(30),
    status VARCHAR(30) DEFAULT TO_DO,
    priority VARCHAR(30) DEFAULT HIGH,
    userId integer not null references users(id),
    deadline DATE DEFAULT CURRENT_DATE,
    createdAt DATE DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
  )
```

```sql
CREATE TABLE user_group 
  (
    user_id INT,
    group_id INT,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY(user_id) REFERENCES users,
    FOREIGN KEY(group_id) REFERENCES groups
  )
```
