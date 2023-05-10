/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as crypto from "crypto";

import constants from "../constants";

// An encrypt function
export default function encryptData(text: string) {
  // Includes crypto module

  // Defining algorithm
  const algorithm = "aes-256-cbc";

  // Defining key
  const key = constants.key;

  // Defining iv
  const iv = constants.iv;
  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);

  // Updating text
  let encrypted = cipher.update(text);

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  // Returning iv and encrypted data
  return encrypted.toString("hex");
}
