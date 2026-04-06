import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });

export const handler = async (event) => {
  const params = {
    TableName: "posts",
    Key: {
      id: { S: event.id }
    }
  };
  try {
    const data = await client.send(new GetItemCommand(params));
    if (!data.Item) {
      return { message: "Post not found" };
    }
    return {
      id: data.Item.id.S,
      title: data.Item.title.S,
      authorId: data.Item.authorId.S,
      text: data.Item.text.S
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};