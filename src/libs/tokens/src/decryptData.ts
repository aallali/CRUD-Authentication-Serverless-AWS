/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as crypto from "crypto";
import constants from "../constants";

export default function decryptData(text) {
  const key = constants.key;

  // Defining iv
  const iv = constants.iv;
  let encryptedText = Buffer.from(text, "hex");

  // Creating Decipher
  let decipher = crypto.createDecipheriv("aes-256-cbc", Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
}
