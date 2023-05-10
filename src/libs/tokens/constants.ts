export default {
  key: Buffer.alloc(32, process.env.ENCRYPTION_KEY, "hex"),
  iv: Buffer.from(process.env.ENCRYPTION_IV, "hex"),
  jwtSecret: process.env.JWT_SECRET,
};
