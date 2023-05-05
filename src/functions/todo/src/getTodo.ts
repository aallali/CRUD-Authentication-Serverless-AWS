import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { ProxyResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const getTodo = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
 
  const id = event.pathParameters.todoId;

  if (id === ":id") return ProxyResponse(400, null, "No todo ID provided!");
  try {
    const todo = await todoService.getTodo(id);

    return ProxyResponse(200, { ...todo.toJSON() }, null);
  } catch (e) {
    return ProxyResponse(400, null, e.message);
  }
};
export default withDatabaseConnection(getTodo);
