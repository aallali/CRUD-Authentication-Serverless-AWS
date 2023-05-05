import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { ProxyResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const deleteTodo = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.todoId;
  try {
    const todo = await todoService.deleteTodo(id);
    return ProxyResponse(200, { todo, id }, null);
  } catch (e) {
    return ProxyResponse(500, e, null);
  }
};

export default withDatabaseConnection(deleteTodo);
