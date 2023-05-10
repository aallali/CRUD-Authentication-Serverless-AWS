import signIn from "./src/signIn";
import signUp from "./src/signUp";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const signUpHandler = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return signUp(event);
};
export const signInHandler = (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return signIn(event);
};
