import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { ProxyResponse } from "@libs/api-gateway";
import { todoService } from "../service";
import { withDatabaseConnection } from "@libs/database";

const updateTodo = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.todoId;
  const { status, title, description } = JSON.parse(event.body) as any;
  // remove undefined properties in the object
  const updatedTodo = Object.fromEntries(
    Object.entries({ status, title, description }).filter(([_, v]) => v != null)
  );

  console.log(id, updatedTodo);
  try {
    const todo = await todoService.updateTodo(id, updatedTodo);
    return ProxyResponse(
      200,
      {
        todo,
        id,
      },
      null
    );
  } catch (e) {
    return ProxyResponse(500, null, e);
  }
};
export default withDatabaseConnection(updateTodo);
