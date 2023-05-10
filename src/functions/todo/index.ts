import { handlerPath } from "@libs/handler-resolver";
export const getAllTodos = {
  handler: `${handlerPath(__dirname)}/handler.getAllTodosHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "todo/",
        authorizer: "myAuthorizer",
        cors: true,
      },
    },
  ],
};

export const createTodo = {
  handler: `${handlerPath(__dirname)}/handler.createTodoHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "todo",
        
      },
    },
  ],
};

export const getTodo = {
  handler: `${handlerPath(__dirname)}/handler.getTodoHandler`,
  events: [
    {
      http: {
        method: "get",
        path: "todo/{todoId}",
      },
    },
  ],
};

export const updateTodo = {
  handler: `${handlerPath(__dirname)}/handler.updateTodoHandler`,
  events: [
    {
      http: {
        method: "put",
        path: "todo/{todoId}",
      },
    },
  ],
};

export const deleteTodo = {
  handler: `${handlerPath(__dirname)}/handler.deleteTodoHandler`,
  events: [
    {
      http: {
        method: "delete",
        path: "todo/{todoId}",
      },
    },
  ],
};
