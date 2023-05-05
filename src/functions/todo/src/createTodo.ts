import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { ProxyResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const createTodo = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);
  const todoBody: { title: string; description: string; status?: boolean } =
    body as any;

  try {
    const todo = await todoService.createTodo({
      title: todoBody.title,
      description: todoBody.description,
      status: todoBody.status,
    });
    return ProxyResponse(200, todo, null);
  } catch (err) {
    return ProxyResponse(500, null, err);
  }
};

export default withDatabaseConnection(createTodo);
