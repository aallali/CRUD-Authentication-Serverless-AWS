import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { ProxyResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const getAllTodos = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  // to get the user id and role set from the Lambda Authorizer
  const reqUser = event.requestContext.authorizer
  const todos = await todoService.getAllTodos();
  return ProxyResponse(200, todos, null);
};

export default withDatabaseConnection(getAllTodos);
