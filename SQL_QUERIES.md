# TODOS

## SQL QUERIES

```sql
CREATE DATABASE sql_todos_db;
```

```sql
CREATE TABLE "user"
  (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    role VARCHAR(30) NOT NULL,
    createdAt DATE DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
  )
```

```sql
CREATE TABLE "group"
  (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(30) NOT NULL,
    createdAt DATE DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
  )
```

```sql
CREATE TABLE "task"
  (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    description VARCHAR(30),
    status VARCHAR(30) NOT NULL,
    priority VARCHAR(30) NOT NULL,
    userId INT,
    FOREIGN KEY(userId) REFERENCES "user" ON UPDATE CASCADE ON DELETE CASCADE,
    deadline DATE NOT NULL,
    createdAt DATE DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
  )
```

```sql
CREATE TABLE "user_group" 
  (
    user_id INT,
    group_id INT,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY(user_id) REFERENCES "user" ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(group_id) REFERENCES "group" ON UPDATE CASCADE ON DELETE CASCADE,
    createdAt DATE DEFAULT CURRENT_DATE,
    updatedAt DATE DEFAULT CURRENT_DATE
  )
```
