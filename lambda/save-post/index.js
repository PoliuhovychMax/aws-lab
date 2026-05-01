const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  try {
    // 👉 парсимо body
    const body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event;

    // ❗️ базова валідація
    if (!body.title || !body.authorId || !body.text) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: "Missing required fields" })
      };
    }

    // 👉 генеруємо id
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

    await client.send(new PutItemCommand(params));

    const createdPost = {
      id,
      title: body.title,
      authorId: body.authorId,
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