import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { todoService } from "../../services";

import { v4 } from "uuid";

export const getAllTodos = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const todos = await todoService.getAllTodos();
  return formatJSONResponse({
    todos,
  });
});

export const createTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoBody: { title: string; description: string } = event.body as any;
    try {
      const id = v4();
      const todo = await todoService.createTodo({
        todosId: id,
        title: todoBody.title,
        description: todoBody.description,
        createdAt: new Date().toISOString(),
        status: false,
      });
      return formatJSONResponse({
        todo,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const getTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;

    try {
      const todo = await todoService.getTodo(id);

      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      console.log(e);
      return formatJSONResponse({
        status: 500,
        message: e.message || e,
      });
    }
  }
);

export const updateTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const status: boolean = (event.body as any).status;
    try {
      const todo = await todoService.updateTodo(id, {
        status,
      });
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);

export const deleteTodo = middyfy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    try {
      const todo = await todoService.deleteTodo(id);
      return formatJSONResponse({
        todo,
        id,
      });
    } catch (e) {
      return formatJSONResponse({
        status: 500,
        message: e,
      });
    }
  }
);
