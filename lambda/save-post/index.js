const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { randomUUID } = require("crypto");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  try {
    const body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event;

    if (!body.title || !body.authorName || !body.authorPassword || !body.text) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: "Missing required fields" })
      };
    }

    const id = randomUUID();

    const params = {
      TableName: "posts",
      Item: {
        id: { S: id },
        title: { S: body.title },
        authorName: { S: body.authorName },
        authorPassword: { S: body.authorPassword },
        text: { S: body.text }
      }
    };

    await client.send(new PutItemCommand(params));

    const createdPost = {
      id,
      title: body.title,
      authorName: body.authorName,
      authorPassword: body.authorPassword,
      text: body.text
    };

    return {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(createdPost)
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