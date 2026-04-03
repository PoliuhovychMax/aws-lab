const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: "eu-central-1",
  apiVersion: "2012-08-10"
});

exports.handler = (event, context, callback) => {
  const params = {
    TableName: "posts"
  };
  dynamodb.scan(params, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      const posts = data.Items.map(item => {
        return {
          id: item.id.S,
          title: item.title.S,
          userId: item.userId.S,
          content: item.length.S
        };
      });
      callback(null, posts);
    }
  });
};