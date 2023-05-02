import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
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
    return formatJSONResponse({
      todo,
    });
  } catch (err) {
    return formatJSONResponse({
      status: 500,
      message: err.message || err,
    });
  }
};

export default withDatabaseConnection(createTodo);
