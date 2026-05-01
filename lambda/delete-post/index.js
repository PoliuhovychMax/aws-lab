const { DynamoDBClient, DeleteItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  try {
    const id = event.pathParameters?.id;

    if (!id) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: "id is required in path" })
      };
    }

    const params = {
      TableName: "posts",
      Key: {
        id: { S: String(id) }
      },
      ReturnValues: "ALL_OLD"
    };

    const data = await client.send(new DeleteItemCommand(params));

    if (!data.Attributes) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: "Post not found" })
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        id: data.Attributes.id.S
      })
    };

  } catch (err) {
    console.error("DELETE ERROR:", err);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(err.message)
    };
  }
};