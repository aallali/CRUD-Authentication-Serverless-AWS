import { handlerPath } from "@libs/handler-resolver";

const authorizerHandler = {
  handler: `${handlerPath(__dirname)}/handler.authorizerHandler`,
};

export default authorizerHandler;
