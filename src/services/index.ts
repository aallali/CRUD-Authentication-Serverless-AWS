import dynamoDBClient from "../model";
import TodoServerice from "./todoService";

const todoService = new TodoServerice(dynamoDBClient());
export { todoService };
