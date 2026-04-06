import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "eu-central-1" });

export const handler = async (event) => {
  const params = {
    TableName: "posts"
  };
  try {
    const data = await client.send(new ScanCommand(params));
    const posts = data.Items.map(item => {
      return {
        id: item.id.S,
        title: item.title.S,
        authorId: item.authorId.S,
        text: item.text.S
      };
    });
    return posts;
  } catch (err) {
    console.error(err);
    throw err;
  }
};