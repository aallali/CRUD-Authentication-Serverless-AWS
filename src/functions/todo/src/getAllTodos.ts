import { APIGatewayProxyResult } from "aws-lambda";
import { ProxyResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const getAllTodos = async (): Promise<APIGatewayProxyResult> => {
  const todos = await todoService.getAllTodos();
  return ProxyResponse(200, todos, null);
};

export default withDatabaseConnection(getAllTodos);
