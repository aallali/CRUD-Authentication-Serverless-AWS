import connect from "./connect";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

function withDatabaseConnection(
  callback: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>
) {
  return async function (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> {
    const database = await connect();

    const result = await callback(event);

    database.close();

    return result;
  };
}

export default withDatabaseConnection;
