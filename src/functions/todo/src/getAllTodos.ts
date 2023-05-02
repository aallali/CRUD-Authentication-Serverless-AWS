import { APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const getAllTodos = async (): Promise<APIGatewayProxyResult> => {
  const todos = await todoService.getAllTodos();
  return formatJSONResponse({
    todos,
  });
};

export default withDatabaseConnection(getAllTodos);
