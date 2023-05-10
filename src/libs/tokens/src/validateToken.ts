import * as jwt from "jsonwebtoken";
import constants from "../constants";

export default function validateJWT(
  token: string
): string | jwt.JwtPayload {
  return jwt.verify(token, constants.jwtSecret);
}
