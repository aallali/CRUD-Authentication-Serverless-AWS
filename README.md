# CRUD + Authentication / Serverless
## [AWS - Node.js - Typescript - mongoDb]

---

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

 
#### Note:
>⚠️ this branch contains MongoDB+Authentication implementation in serverless/nodeJs using Mongoose

>⚠️ check other branches for different DB or Implementations

> Don't hesitate to contribute if you see something to improve or got better ideas, i would like to learn :) 
## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium  (v14.21.3)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

 

### Using Yarn

- Run `yarn ci` to install the project dependencies (script declared in package.json)
- Run `yarn deploy` to deploy this stack to AWS

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```
.
├── src
│   ├── functions
│   │   ├── authorizer                     # Lambda Authorizer
│   │   │   ├── handler.ts
│   │   │   ├── index.ts
│   │   │   └── src
│   │   │       └── AuthPolicy.ts          # policy document generator
│   │   ├── todo                           # TODO functions container
│   │   │   ├── handler.ts 
│   │   │   ├── index.ts
│   │   │   ├── service
│   │   │   │   ├── index.ts
│   │   │   │   └── todoService.ts
│   │   │   └── src
│   │   │       ├── createTodo.ts
│   │   │       ├── deleteTodo.ts
│   │   │       ├── getAllTodos.ts
│   │   │       ├── getTodo.ts
│   │   │       └── updateTodo.ts
│   │   └── users                          # USERS functions container
│   │       ├── handler.ts
│   │       ├── index.ts
│   │       ├── service
│   │       │   ├── index.ts
│   │       │   └── usersService.ts
│   │       └── src
│   │           ├── signIn.ts
│   │           └── signUp.ts
│   └── libs
│       ├── api-gateway.ts
│       ├── database                       # DATABASE custom package    
│       │   ├── connect.ts
│       │   ├── index.ts
│       │   ├── model
│       │   │   ├── todo.ts
│       │   │   └── user.ts
│       │   ├── queries
│       │   │   └── index.ts
│       │   └── withDatabaseConnection.ts  # DB connection wrapper
│       ├── handler-resolver.ts
│       └── tokens                         # Tokens custom package
│           ├── constants.ts
│           ├── index.ts
│           └── src
│               ├── decryptData.ts
│               ├── encryptData.ts
│               ├── generateJWT.ts
│               ├── getTokenPayload.ts
│               └── validateToken.ts
├── README.md
├──.env
├──.env.dev
├──.env.production
├── package.json
├── serverless.ts
├── tsconfig.json
├── tsconfig.paths.json
└── yarn.lock
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Deployment to AWS
- in order to deploy from your local to the AWS cloud:
- follow the instructions [here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) to generate your AWS credentials
- use them in your machine by this command :

    > ➜ serverless config credentials --provider aws --key XXX --secret XXX

    > ✔ Profile "default" has been configured

- run `yarn deploy`
    <details>
    <summary>Click me</summary>
        
    ```shell
    ➜ sls deploy --stage dev
    Running "serverless" from node_modules
    DOTENV: Loading environment variables from .env.dev:
            - MONGO_URL
            - STAGE
            - JWT_SECRET
            - ENCRYPTION_KEY
            - ENCRYPTION_IV

    Deploying todo-aws-serverless to stage dev (us-east-1)

    ✔ Service deployed to stack todo-aws-serverless-dev (207s)

    endpoints:
        GET - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/todo
        POST - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/todo
        GET - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/todo/{todoId}
        PUT - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/todo/{todoId}
        DELETE - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/todo/{todoId}
        POST - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/users/signup
        POST - https://XXXX.execute-api.us-east-1.amazonaws.com/dev/users/signin
    functions:
        myAuthorizer: todo-aws-serverless-dev-myAuthorizer (314 kB)
        getAllTodos: todo-aws-serverless-dev-getAllTodos (1.4 MB)
        createTodo: todo-aws-serverless-dev-createTodo (1.4 MB)
        getTodo: todo-aws-serverless-dev-getTodo (1.4 MB)
        updateTodo: todo-aws-serverless-dev-updateTodo (1.4 MB)
        deleteTodo: todo-aws-serverless-dev-deleteTodo (1.4 MB)
        signUp: todo-aws-serverless-dev-signUp (1.7 MB)
        signIn: todo-aws-serverless-dev-signIn (1.7 MB)

    ```
    </details>
### Test Endpoints locally : 
run locally with `yarn dev`
```shell
➜ sls offline start
Running "serverless" from node_modules
DOTENV: Loading environment variables from .env:
         - MONGO_URL
         - STAGE
         - JWT_SECRET
         - ENCRYPTION_KEY
         - ENCRYPTION_IV

Starting Offline at stage dev (us-east-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * myAuthorizer: todo-aws-serverless-dev-myAuthorizer
           * getAllTodos: todo-aws-serverless-dev-getAllTodos
           * createTodo: todo-aws-serverless-dev-createTodo
           * getTodo: todo-aws-serverless-dev-getTodo
           * updateTodo: todo-aws-serverless-dev-updateTodo
           * deleteTodo: todo-aws-serverless-dev-deleteTodo
           * signUp: todo-aws-serverless-dev-signUp
           * signIn: todo-aws-serverless-dev-signIn
Configuring Authorization: todo/ myAuthorizer

   ┌─────────────────────────────────────────────────────────────────────────────────┐
   │                                                                                 │
   │   GET    | http://localhost:3000/dev/todo                                       │
   │   POST   | http://localhost:3000/2015-03-31/functions/getAllTodos/invocations   │
   │   POST   | http://localhost:3000/dev/todo                                       │
   │   POST   | http://localhost:3000/2015-03-31/functions/createTodo/invocations    │
   │   GET    | http://localhost:3000/dev/todo/{todoId}                              │
   │   POST   | http://localhost:3000/2015-03-31/functions/getTodo/invocations       │
   │   PUT    | http://localhost:3000/dev/todo/{todoId}                              │
   │   POST   | http://localhost:3000/2015-03-31/functions/updateTodo/invocations    │
   │   DELETE | http://localhost:3000/dev/todo/{todoId}                              │
   │   POST   | http://localhost:3000/2015-03-31/functions/deleteTodo/invocations    │
   │   POST   | http://localhost:3000/dev/users/signup                               │
   │   POST   | http://localhost:3000/2015-03-31/functions/signUp/invocations        │
   │   POST   | http://localhost:3000/dev/users/signin                               │
   │   POST   | http://localhost:3000/2015-03-31/functions/signIn/invocations        │
   │                                                                                 │
   └─────────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀
```
- **register** `POST    | http://localhost:3000/dev/users/signup`
    <details>
    <summary>Click me</summary>

    - body_1:
        ```json
        {
            "firstName": "Faker",
            "lastName": "Holder",
            "email": "fake@fake.com",
            "password": "Abcdefgh123"
        }
        ```
    - result_1:
        ```json
        "Account created succefully, please check you email for verification."
        ```
    - body_2:
        ```json
        {
            "firstName": "Faker",
            "lastName": "",
            "email": "fake@fake.com",
            "password": "Abcdefgh123"
        }
        ```
    - result_2:
        ```json
        {
            "code": "too_small",
            "minimum": 5,
            "type": "string",
            "inclusive": true,
            "exact": false,
            "message": "String must contain at least 5 character(s)",
            "path": [
                "lastName"
            ]
        }
        ```
    </details>
- **login** `POST    | http://localhost:3000/dev/users/signin`
    <details>
    <summary>Click me</summary>

    - body_1:
        ```json
        {
            "email": "fake@fake.com",
            "password": "Abcdefgh123"
        }
        ```
    - result_1:
        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoiYXV0aHxkZXYiLCJ1c2VyIjoiVVNFUnw2NDViZDZhYzYwMTJmNDU2Y2YzMGJlMTYiLCJhY3R2Ijp0cnVlLCJhY3R2MiI6IkVtYWlsIFZlcmlmaWNhdGlvbiIsImlhdCI6MTY4Mzc0MDg1NCwiZXhwIjoxNjgzNzQ0NDU0fQ.-FArqfrEaMYoiE3ZxHSCSaTtjpGGcFl3VqMMjDFTsjM"
        }
        ```
    </details>

- **createTodo** `POST   | http://localhost:3000/dev/todo`
    <details>
    <summary>Click me</summary>

    - body_1:
        ```json
        {
            "title": "todo title example",
            "description": "lorem lepsum, lorem lepsum"
        }
        ```
    - result_1:
        ```json
        {
            "todo": {
                "todosId": "645129cc4e8969a6ab36f72a",
                "title": "todo title example",
                "description": "lorem lepsum, lorem lepsum",
                "status": false,
                "created_at": "2023-05-02T15:18:36.508Z",
                "updated_at": "2023-05-02T15:18:36.508Z"
            }
        }
        ```
    - body_2:
        ```json
        {
            "title": "second todo title example",
            "description": "test the second todo creation"
        }
        ```
    - result_2:
        ```json
            {
                "todo": {
                    "todosId": "64512a614e8969a6ab36f72c",
                    "title": "second todo title example",
                    "description": "test the second todo creation",
                    "status": false,
                    "created_at": "2023-05-02T15:21:05.544Z",
                    "updated_at": "2023-05-02T15:21:05.544Z"
                }
            }
        ```

    </details>

- **getAllTodos** `GET    | http://localhost:3000/dev/todo`
    <details>
    <summary>Click me</summary>

    - with header including Authorization token we got from login request  `Bearer ##############`
    - result1:
        ```json
        {
            "todos": [
                {
                    "todosId": "645129cc4e8969a6ab36f72a",
                    "title": "todo title example",
                    "description": "lorem lepsum, lorem lepsum",
                    "status": false,
                    "created_at": "2023-05-02T15:18:36.508Z",
                    "updated_at": "2023-05-02T15:18:36.508Z"
                },
                {
                    "todosId": "64512a614e8969a6ab36f72c",
                    "title": "second todo title example",
                    "description": "test the second todo creation",
                    "status": false,
                    "created_at": "2023-05-02T15:21:05.544Z",
                    "updated_at": "2023-05-02T15:21:05.544Z"
                }
            ]
        }
        ```
    - without Authorization token.
    - result1:
        ```json
        statusCode: 401
        {
            "message": "Unauthorized"
        }
        ```
    </details>
- **getTodo** `GET    | http://localhost:3000/dev/todo/{todoId}`
    <details>
    <summary>Click me</summary>

    - exists : http://localhost:3000/dev/todo/64512a614e8969a6ab36f72c
    - result : 
        ```json
        {
            "todo": {
                "todosId": "64512a614e8969a6ab36f72c",
                "title": "second todo title example",
                "description": "test the second todo creation",
                "status": false,
                "created_at": "2023-05-02T15:21:05.544Z",
                "updated_at": "2023-05-02T15:21:05.544Z"
            },
            "id": "64512a614e8969a6ab36f72c"
        }
        ```
    - non existing : http://localhost:3000/dev/todo/00000a614e8969a6ab00000c
    - result : 
        ```json
        {
            "status": 500,
            "message": "Id does not exit"
        }
        ```
    </details>
- **updateTodo** `PUT    | http://localhost:3000/dev/todo/{todoId}`
    <details>
    <summary>Click me</summary>

    - body:
        ```json
        {
            "description": "(description of second todo is updated, and status set to True)",
            "status": true
        }
        ```
    - result:
        ```json
        {
            "todo": {
                "todosId": "64512a614e8969a6ab36f72c",
                "title": "second todo title example",
                "description": "(description of second todo is updated, and status set to True)",
                "status": true,
                "created_at": "2023-05-02T15:21:05.544Z",
                "updated_at": "2023-05-02T15:30:57.845Z"
            },
            "id": "64512a614e8969a6ab36f72c"
        }
        ```
    </details>
- **deleteTodo** `DELETE | http://localhost:3000/dev/todo/{todoId}`
    <details>
    <summary>Click me</summary>

    - request : http://localhost:3000/dev/todo/645129cc4e8969a6ab36f72a
    - result:
        ```json
            {
                "todo": {
                    "acknowledged": true,
                    "deletedCount": 1
                },
                "id": "645129cc4e8969a6ab36f72a"
            }
        ```
    </details>

- **getAllTodos-final** `GET    | http://localhost:3000/dev/todo`
    <details>
    <summary>Click me</summary>

    - result:
    ```json
        {
            "todos": [
                {
                    "todosId": "64512a614e8969a6ab36f72c",
                    "title": "second todo title example",
                    "description": "(description of second todo is updated, and status set to True)",
                    "status": true,
                    "created_at": "2023-05-02T15:21:05.544Z",
                    "updated_at": "2023-05-02T15:30:57.845Z"
                }
            ]
        }
    ```
    </details>

 

## todo
- [ ] document all the code
- [x] deploy to AWS
- [x] test deployed functionality with Postman
- [x] creat a test enviorment with Postman for local/deployed
- [x] integrate MongoDb into the app