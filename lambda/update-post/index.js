const { DynamoDBClient, UpdateItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  try {
    const body = typeof event.body === "string"
      ? JSON.parse(event.body)
      : event;

    const id = event.pathParameters.id;

    if (!id || !body.title || !body.text) {
      return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ message: "Missing required fields" })
      };
    }

    const params = {
      TableName: "posts",
      Key: {
        id: { S: id }
      },
      UpdateExpression: "SET title = :title, #txt = :text",
      ExpressionAttributeNames:{
        "#txt": "text"
      },
      ExpressionAttributeValues: {
        ":title": { S: body.title },
        ":text": { S: body.text }
      },
      ConditionExpression: "attribute_exists(id)",
      ReturnValues: "ALL_NEW"
    };

    const result = await client.send(new UpdateItemCommand(params));

    const updatedPost = {
      id: result.Attributes.id?.S,
      title: result.Attributes.title.S,
      authorName: result.Attributes.authorName.S,
      authorPassword: result.Attributes.authorPassword.S,
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
    throw err;
  }
};