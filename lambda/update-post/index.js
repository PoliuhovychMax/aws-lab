import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });

export const handler = async (event) => {
  const body = typeof event.body === "string" ? JSON.parse(event.body) : event;
  const id = body.title.toLowerCase().replace(/\s+/g, "-");
  const params = {
    TableName: "posts",
    Key: {
      id: { S: id }
    },
    UpdateExpression: "SET title = :title, authorId = :authorId, #len = :length, text = :text",
    ExpressionAttributeNames: {
      "#len": "length"
    },
    ExpressionAttributeValues: {
      ":title": { S: body.title },
      ":authorId": { S: body.authorId },
      ":text": { S: body.text }
    },
    ReturnValues: "ALL_NEW"
  };
  try {
    const result = await client.send(new UpdateItemCommand(params));
    return {
    id,
    title: body.title,
    authorId: body.authorId,
    text: body.text
  };
  } catch (err) {
    console.error(err);
    throw err;
  }
};