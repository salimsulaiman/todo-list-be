# Daftar End Point

---

## End point User

- Create User (`POST`) : http://localhost:3030/users
  ```json
  * req body
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- Login User (`POST`) : http://localhost:3030/login
  ```json
  * req body
  {
    "email": "string",
    "password": "string"
  }
  ```
- Get All User (`GET`) : http://localhost:3030/users
  ```json
  req header authentication from endpoint `Login` to get token
  ```
- Get User by id (`GET`) : http://localhost:3030/users/:id
- Edit User (`PUT`) : http://localhost:3030/users/:id
  ```json
  * req body
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
  ```
- Delete User (`DELETE`) http://localhost:3030/users/:id

## End point Todo

- Get All Todo (`GET`) : http://localhost:3030/todos
- Get All Todo with Detail User (`GET`) : http://localhost:3030/todos/users
- Get Todo by User Id (`GET`) : http://localhost:3030/todos/:user_id
- Create Todo (`POST`) : http://localhost:3030/todos/:user_id
  ```json
  {
    "todo": "string"
  }
  ```
- Edit Todo (`PUT`) : http://localhost:3030/todos/:todo_id
  ```json
  {
    "todo": "string",
    "isdone": boolean
  }
  ```
- Delete Todo by Id (`DELETE`) : http://localhost:3030/todos/:todo_id
- Delete All Todo by User id (`DELETE`) : http://localhost:3030/todos/all/:user_id
