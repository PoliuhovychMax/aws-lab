const client = new DynamoDBClient({ region: "eu-central-1" });

export const handler = async (event) => {
  const params = {
    TableName: "posts",
    Key: {
      id: { S: event.id }
    },
    ReturnValues: "ALL_OLD"
  };
  try {
    const data = await client.send(new DeleteItemCommand(params));
    if (!data.Attributes) {
      return{ message: "Post not found or already deleted" };
    }
    return {
      id: data.Attributes.id.S,
      title: data.Attributes.title.S,
      authorId: data.Attributes.authorId.S,
      text: data.Attributes.text.S,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};