import * as jwt from "jsonwebtoken";

export default function getTokenPayload(token: string): any {
  return jwt.decode(token);
}
