import { handlerPath } from "@libs/handler-resolver";

export const signUp = {
  handler: `${handlerPath(__dirname)}/handler.signUpHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "users/signup",
      },
    },
  ],
};

export const signIn = {
  handler: `${handlerPath(__dirname)}/handler.signInHandler`,
  events: [
    {
      http: {
        method: "post",
        path: "users/signin",
      },
    },
  ],
};
