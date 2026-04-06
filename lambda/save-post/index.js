import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });

export const handler = async (event) => {
  const body = typeof event.body === "string" ? JSON.parse(event.body) : event;
  const id = body.title.toLowerCase().replace(/\s+/g, "-");
  const params = {
    TableName: "posts",
    Item: {
      id: { S: id },
      title: { S: body.title },
      authorId: { S: body.authorId },
      text: { S: body.text }
    }
  };
  try {
    await client.send(new PutItemCommand(params));
    return {
      id,
      title: event.title,
      authorId: event.authorId,
      text: event.text
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};