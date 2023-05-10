import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { ProxyResponse } from "@libs/api-gateway";
import { withDatabaseConnection, userLoginSchema } from "@libs/database";
import { encryptData } from "@libs/tokens";
import { usersService } from "../service";

const signIn = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);

    userLoginSchema.parse(body);

    const { email, password } = body;
    const loginCredentials = {
      email,
      password: encryptData(password),
    };

    const loginToken = await usersService.login(
      loginCredentials.email,
      loginCredentials.password
    );

    if (loginToken) return ProxyResponse(200, { ...loginToken }, null);
    
    return ProxyResponse(401, null, "Invalid Password");
  } catch (error) {
    return ProxyResponse(401, null, error.message || error);
  }
};

export default withDatabaseConnection(signIn);
