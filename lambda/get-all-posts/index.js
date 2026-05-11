const { DynamoDBClient, ScanCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({ region: "eu-central-1" });

exports.handler = async (event) => {
  try {
    const data = await client.send(new ScanCommand({
      TableName: "posts"
    }));

    const posts = data.Items.map(item => ({
      id: item.id.S,
      title: item.title.S,
      authorName: item.authorName.S,
      authorPassword: item.authorPassword.S,
      text: item.text.S
    }));

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(posts)
    };

  } catch (err) {
    console.error(err);

    return {
      statusCode: 500,
      body: JSON.stringify(err.message)
    };
  }
};