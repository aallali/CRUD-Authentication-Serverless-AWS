require("dotenv").config();
import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
console.log(process.env.DYNAMO_REGION, process.env.DYNAMO_URL)
const dynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: process.env.DYNAMO_REGION || "localhost",
      endpoint: process.env.DYNAMO_URL || "http://localhost:5000",
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};

export default dynamoDBClient;
