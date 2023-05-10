import connect from "./connect";

function withDatabaseConnection(
  callback: (...params: any) => Promise<any>
) {
  return async function (...params: any): Promise<any> {
    const database = await connect();

    const result = await callback(...params);

    database.close();

    return result;
  };
}

export default withDatabaseConnection;
