const { DynamoDBClient, GetItemCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  try {
    // 👉 id може приходити по-різному:
    // 1. через path: /posts/{id}
    // 2. через body (рідше для GET, але на всякий)
    let id;

    if (event.pathParameters && event.pathParameters.id) {
      id = event.pathParameters.id;
    } else if (event.body) {
      const body = JSON.parse(event.body);
      id = body.id;
    } else {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: "Missing id" })
      };
    }

    const data = await client.send(new GetItemCommand({
      TableName: "posts",
      Key: {
        id: { S: id }
      }
    }));

    // ❗️ якщо не знайдено
    if (!data.Item) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ message: "Post not found" })
      };
    }

    // ✅ якщо знайдено
    const post = {
      id: data.Item.id.S,
      title: data.Item.title.S,
      authorId: data.Item.authorId.S,
      text: data.Item.text.S
    };

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(post)
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