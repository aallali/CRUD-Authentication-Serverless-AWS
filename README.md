## Serverless - AWS - Node.js - Typescript - TODO app [mongoDb]
---
This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).


#### Note:
>this branch contains MongoDB implementation in serverless/nodeJs using Mongoose
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
│   │   ├── __ignore__
│   │   └── todo
│   │       ├── handler.ts
│   │       ├── index.ts
│   │       ├── service
│   │       │   ├── index.ts
│   │       │   └── todoService.ts
│   │       └── src
│   │           ├── createTodo.ts
│   │           ├── deleteTodo.ts
│   │           ├── getAllTodos.ts
│   │           ├── getTodo.ts
│   │           └── updateTodo.ts
│   └── libs
│       ├── api-gateway.ts
│       ├── database
│       │   ├── connect.ts
│       │   ├── index.ts
│       │   ├── model
│       │   │   └── todo.ts
│       │   ├── queries
│       │   │   └── index.ts
│       │   └── withDatabaseConnection.ts
│       └── handler-resolver.ts
├── package.json
├── serverless.ts
├── tsconfig.json
├── tsconfig.paths.json
├──.env
├──.env.development
├──.env.production
├── yarn.lock
└── README.md
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
    todo-AWS-Serverless on  mongodb-implement [!?] is 📦 1.0.0 via ⬢ v14.21.0 took 1m 43.0s 
    ➜ yarn deploy
    yarn run v1.22.19
    $ sls deploy
    DOTENV: Loading environment variables from .env, .env.development:
            - MONGO_URL

    Deploying todo-aws-serverless to stage dev (us-east-1)

    ✔ Service deployed to stack todo-aws-serverless-dev (84s)

    endpoints:
    GET - https://{{public_url}}.amazonaws.com/dev/todo
    POST - https://{{public_url}}.amazonaws.com/dev/todo
    GET - https://{{public_url}}.amazonaws.com/dev/todo/{todoId}
    PUT - https://{{public_url}}.amazonaws.com/dev/todo/{todoId}
    DELETE - https://{{public_url}}.amazonaws.com/dev/todo/{todoId}
    functions:
    getAllTodos: todo-aws-serverless-dev-getAllTodos (1.3 MB)
    createTodo: todo-aws-serverless-dev-createTodo (1.3 MB)
    getTodo: todo-aws-serverless-dev-getTodo (1.3 MB)
    updateTodo: todo-aws-serverless-dev-updateTodo (1.3 MB)
    deleteTodo: todo-aws-serverless-dev-deleteTodo (1.3 MB)

    Improve API performance – monitor it with the Serverless Console: run "serverless --console"
    ✨  Done in 89.20s.
    ```
    </details>
### Test Endpoints locally : 
run locally with `yarn dev`
```shell
➜ yarn dev
yarn run v1.22.19
$ nodemon -e ts  --exec "sls offline start"
[nodemon] 2.0.20
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: ts
[nodemon] starting `sls offline start`
DOTENV: Loading environment variables from .env, .env.development:
	 - MONGO_URL

Starting Offline at stage dev (us-east-1)

Offline [http for lambda] listening on http://localhost:3002
Function names exposed for local invocation by aws-sdk:
           * getAllTodos: todo-aws-serverless-dev-getAllTodos
           * createTodo: todo-aws-serverless-dev-createTodo
           * getTodo: todo-aws-serverless-dev-getTodo
           * updateTodo: todo-aws-serverless-dev-updateTodo
           * deleteTodo: todo-aws-serverless-dev-deleteTodo

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
   │                                                                                 │
   └─────────────────────────────────────────────────────────────────────────────────┘

Server ready: http://localhost:3000 🚀

```
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

    - result:
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