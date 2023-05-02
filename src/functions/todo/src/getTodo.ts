import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const getTodo = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.todoId;

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
};
export default withDatabaseConnection(getTodo);
