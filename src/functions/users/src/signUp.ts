import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { ProxyResponse } from "@libs/api-gateway";
import { withDatabaseConnection, userRegisterSchema } from "@libs/database";
import { encryptData } from "@libs/tokens";
import { usersService } from "../service";

const signUp = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {

    // TODO : customize error message
    const body = JSON.parse(event.body);
    userRegisterSchema.parse(body);
    const { firstName, lastName, email, password } = body;
    const userData = {
      firstName,
      lastName,
      email,
      companyId: "default",
      password: encryptData(password),
    };
    const userDoc = await usersService.createUser(userData);
    await usersService.sendAccountVerificationMail(userDoc);
    return ProxyResponse(
      200,
      "Account created succefully, please check you email for verification.",
      null
    );
  } catch (error) {
    return ProxyResponse(400, null, error);
  }
};

export default withDatabaseConnection(signUp);
