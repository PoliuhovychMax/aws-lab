const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB({
  region: "eu-cental-1",
  apiVersion: "2012-08-10"
});

const replaceAll = (str, find, replace) => {
  return str.replace(new RegExp(find, "g"), replace);
};

exports.handler = (event, context, callback) => {
  const id = replaceAll(event.title, " ", "-").toLowerCase();
  const params = {
    Item: {
      id: {
        S: id
      },
      title: {
        S: event.title
      },
      authorId: {
        S: event.userId
      },
      length: {
        S: event.length
      },
      category: {
        S: event.category
      }
    },
    TableName: "posts"
  };
  dynamodb.putItem(params, (err, data) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      callback(null, {
        id: params.Item.id.S,
        title: params.Item.title.S,
        userId: params.Item.userId.S,
        length: params.Item.length.S,
        category: params.Item.category.S
      });
    }
  });
};