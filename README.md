# Serverless - AWS Node.js Typescript - TODO app

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

Depending on your preferred package manager, follow the instructions below to deploy your project.

> **Requirements**: NodeJS `lts/fermium  (v14.21.3)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

### Using NPM

- Run `npm install` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Using Yarn

- Run `yarn install` to install the project dependencies
- Run `yarn sls deploy` to deploy this stack to AWS

## Test your service

This template contains a single lambda function triggered by an HTTP request made on the provisioned API Gateway REST API `/hello` route with `POST` method. The request body must be provided as `application/json`. The body structure is tested by API Gateway against `src/functions/hello/schema.ts` JSON-Schema definition: it must contain the `name` property.

- requesting any other path than `/hello` with any other method than `POST` will result in API Gateway returning a `403` HTTP error code
- sending a `POST` request to `/hello` with a payload **not** containing a string property named `name` will result in API Gateway returning a `400` HTTP error code
- sending a `POST` request to `/hello` with a payload containing a string property named `name` will result in API Gateway returning a `200` HTTP status code with a message saluting the provided name and the detailed event processed by the lambda

> :warning: As is, this template, once deployed, opens a **public** endpoint within your AWS account resources. Anybody with the URL can actively execute the API Gateway endpoint and the corresponding lambda. You should protect this endpoint with the authentication method of your choice.



## Template features

### Project structure

The project code base is mainly located within the `src` folder. This folder is divided in:

- `functions` - containing code base and configuration for your lambda functions
- `libs` - containing shared code base between your lambdas

```

.
├── src
│   ├── functions
│   │   ├── index.ts
│   │   └── todo
│   │       ├── handler.ts       # `Todo` lambda source code
│   │       └── index.ts         # `Todo` lambda Serverless configuration
│   └── libs                     # Lambda shared code
│       └── api-gateway.ts       # API Gateway specific helpers
│       └── handler-resolver.ts  # Sharable library for resolving lambda handlers
│       └── lambda.ts            # Lambda middleware
│   ├── model
│   │   ├── Todo.ts
│   │   └── index.ts
│   └── services
│       ├── index.ts
│       └── todoService.ts
├── serverless.ts               # Serverless service file
├── tsconfig.json               # Typescript compiler configuration
├── tsconfig.paths.json         # Typescript paths
├──.env
├──.env.development
├──.env.production
├── package.json
├── yarn.lock
└── README.md
```

### 3rd party libraries

- [json-schema-to-ts](https://github.com/ThomasAribart/json-schema-to-ts) - uses JSON-Schema definitions used by API Gateway for HTTP request validation to statically generate TypeScript types in your lambda's handler code base
- [middy](https://github.com/middyjs/middy) - middleware engine for Node.Js lambda. This template uses [http-json-body-parser](https://github.com/middyjs/middy/tree/master/packages/http-json-body-parser) to convert API Gateway `event.body` property, originally passed as a stringified JSON, to its corresponding parsed object
- [@serverless/typescript](https://github.com/serverless/typescript) - provides up-to-date TypeScript definitions for your `serverless.ts` service file

### Deployment to AWS
- in order to deploy from your local to the AWS cloud:
- follow the instructions [here](https://www.serverless.com/framework/docs/providers/aws/guide/credentials/) to generate your AWS credentials
- use them in your machine by this command :

    > ➜ serverless config credentials --provider aws --key XXX --secret XXX

    > ✔ Profile "default" has been configured

### Advanced usage

Any tsconfig.json can be used, but if you do, set the environment variable `TS_NODE_CONFIG` for building the application, eg `TS_NODE_CONFIG=./tsconfig.app.json npx serverless webpack`

## Explain the code:
### serverless.ts

- **frameworkVersion** 
    >is the version of the Serverless Framework our project is running on. Version 3 is the latest release at the time of writing.
    
- plugins: 

    - **serverless-esbuild** and **serverless-offline**
    >that enable our project to run locally
    - **serverless-dynamodb-local** 
    >enables us to run DynamoDB locally.
- providers:
we configure the cloud provider used for our project. We defined some properties of the cloud provider, like the name, runtime, apiGateway,iam
    - **iam**
    >iam statements to give our Lambda functions read and write permissions to our DynamoDB resource table.


### How i Fixed ...
- **the error** :

when i tried to run `sls offline start`, an error about DynamoDB local not running, after some investigation i noticed that i didn't run : `sls dynamodb install`
but after run that command i came accross this error:
```shell
➜ sls dynamodb install
Running "serverless" from node_modules
Started downloading dynamodb-local from http://s3-us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.tar.gz into /Users/XXXX/Desktop/todo-AWS-Serverless/.dynamodb. Process may take few minutes.
✖ Uncaught exception
Environment: darwin, node 14.21.0, framework 3.30.1 (local) 3.25.1v (global), plugin 6.2.3, SDK 4.3.2
Docs:        docs.serverless.com
Support:     forum.serverless.com
Bugs:        github.com/serverless/serverless/issues

Error:
Error: Error getting DynamoDb local latest tar.gz location undefined: 403
```
Apparently it start to download something into `.dynamodb/` folder, but nothing is in there,
- **Solution**

Downloaded the tar.gz file from the official AWS website, and unzipped it into `.dyanmodb` folder.
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title
then run `sls dynamodb install`. PROBLEME FIXED

---
- **the error** :

after deploy the app into AWS using the command `sls deploy`

i tested the GET endpoint that uses this function `"getAllTodos"`  but i got `500 internal server error`

i tried to check the logs via this command `serverless logs -f getAllTodos -t`

and this is the output 

>2023-04-29 21:34:31.413     ERROR       Invoke Error    {"errorType":"AccessDeniedException","errorMessage":"User: arn:aws:sts::340132161984:assumed-role/todo-aws-serverless-dev-us-east-1-lambdaRole/**todo-aws-serverless-dev-getAllTodos is not authorized to perform: dynamodb:Scan** on resource: arn:aws:dynamodb:us-east-1:340132161984:table/TodosTable because no identity-based policy allows the dynamodb:Scan action","code":"**AccessDeniedException**","message":"User: arn:aws:sts::340132161984:assumed-role/todo-aws-serverless-dev-us-east-1-lambdaRole/todo-aws-serverless-dev-getAllTodos is not authorized to perform: dynamodb:Scan on resource: arn:aws:dynamodb:us-east-1:340132161984:table/TodosTable **because no identity-based policy** allows the **dynamodb:Scan action**","time"

- **Solution**

got to AWS portal then :
1. IAM Go to policies
1. Choose the `AmazonDynamoDBFullAccess` policy (try full access and then go back and restrict your permissions)
1. From **Policy Actions**  - Select **Attach** and Attach it to the role that is used by your Lambda
test your endpoint again. PROBLEME FIXED


## todo
- [x] run dynamoDB locally
- [ ] document all the code
- [x] deploy to AWS
- [x] test deployed functionality with Postman
- [x] creat a test enviorment with Postman for local/deployed
- [x] integrate MongoDb into the app (check other branch)