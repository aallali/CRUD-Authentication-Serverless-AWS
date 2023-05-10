import * as jwt from "jsonwebtoken";
import constants from "../constants";

export default function generateJWT(
  // eslint-disable-next-line @typescript-eslint/ban-types
  data: string | Buffer | object,
  expiresIn: string | number
): Promise<any> {
  return new Promise((resolve, reject) =>
    jwt.sign(
      data,
      constants.jwtSecret,
      { expiresIn },
      function (err: any, token: string) {
        if (err) reject(err);
        resolve(token);
      }
    )
  );
}
