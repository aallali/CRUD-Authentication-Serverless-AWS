import * as mongoose from "mongoose";

async function connect(): Promise<mongoose.Connection> {
  if (!process.env.MONGO_URL) {
    throw new Error("Mongodb uri is not defined");
  }

  const database = mongoose.connection;

  database.on("error", (error) => {
    console.error("DB Connection Error:", error);
  });

  database.once("open", () => {
    console.info(":------- DB Connected Successfully ----------:");
  });
  await mongoose.connect(process.env.MONGO_URL, {
    autoCreate: true,
    autoIndex: true,
  });
  return database;
}

export default connect;
