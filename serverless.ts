import type { AWS } from "@serverless/typescript";

import {
  getAllTodos,
  createTodo,
  getTodo,
  updateTodo,
  deleteTodo,
} from "@functions/todo";

const serverlessConfiguration: AWS = {
  service: "todo-aws-serverless",
  frameworkVersion: "3",
  plugins: [
    "serverless-esbuild",
    "serverless-offline",
    "serverless-dotenv-plugin",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
    },
  },

  // import the function via paths
  functions: { getAllTodos, createTodo, getTodo, updateTodo, deleteTodo },

  package: { individually: true },
  custom: {
    "serverless-offline-watcher": [
      {
        path: "src/**/*.ts",
        command: `yarn dev`,
      },
    ],
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
