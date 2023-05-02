import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const deleteTodo = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.todoId;
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
};

export default withDatabaseConnection(deleteTodo);
