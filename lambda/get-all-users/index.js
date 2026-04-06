import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb"

const client = new DynamoDBClient({ region: "eu-central-1" });

export const handler = async (event) =>
{
  const params = {
    TableName: "users",
  };

  try{
    const data = await client.send(new ScanCommand(params));
    const users = data.Items.map(item => {
      return { id: item.id.S, firstName: item.firstName.S, lastName: item.lastName.S }
    });
    return users;
  } catch (err){
    console.error(err);
    throw err;
  }
};
