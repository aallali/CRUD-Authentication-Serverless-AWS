import getAllTodos from "./src/getAllTodos";
import getTodo from "./src/getTodo";
import createTodo from "./src/createTodo";
import updateTodo from "./src/updateTodo";
import deleteTodo from "./src/deleteTodo";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const getAllTodosHandler = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return getAllTodos(event);
};

export const getTodoHandler = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return getTodo(event);
};

export const createTodoHandler = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return createTodo(event);
};

export const updateTodoHandler = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return updateTodo(event);
};

export const deleteTodoHandler = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return deleteTodo(event);
};
