const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  try {
    const body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event;

    // ❗️ перевірка
    if (!body.id || !body.title || !body.authorId || !body.text) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: "Missing required fields" })
      };
    }

    const params = {
      TableName: "posts",
      Key: {
        id: { S: body.id }
      },
      UpdateExpression: "SET title = :title, authorId = :authorId, text = :text",
      ExpressionAttributeValues: {
        ":title": { S: body.title },
        ":authorId": { S: body.authorId },
        ":text": { S: body.text }
      },
      ReturnValues: "ALL_NEW"
    };

    const result = await client.send(new UpdateItemCommand(params));

    const updatedPost = {
      id: result.Attributes.id.S,
      title: result.Attributes.title.S,
      authorId: result.Attributes.authorId.S,
      text: result.Attributes.text.S
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(updatedPost)
    };

  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(err.message)
    };
  }
};