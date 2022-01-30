const { MySQLManagementClient } = require("@azure/arm-mysql");
const { DefaultAzureCredential } = require("@azure/identity");

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
// Reference: https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential
const credential = new DefaultAzureCredential();

async function createDatabase() {
  const resourceGroupName = process.env.AZURE_RESOURCE_GROUP_NAME;
  const serverName = process.env.AZURE_MYSQL_SERVER_NAME;
  const adminName = process.env.AZURE_MYSQL_ADMIN_USERNAME;
  const adminPassword = process.env.AZURE_MYSQL_ADMIN_PASSWORD;
  // Reference: https://www.npmjs.com/package/@azure/arm-mysql
  const client = new MySQLManagementClient(credential, subscriptionId);
  // The object to be passed into ServerForCreate for creation properties
  // This will default to MySQL 5.7
  // https://docs.microsoft.com/en-us/javascript/api/@azure/arm-mysql/serverforcreate?view=azure-node-latest
  const parameters = {
    location: "eastus",
    properties: {
      administratorLogin: adminName,
      administratorLoginPassword: adminPassword,
      createMode: "Default"
    },
  };

  await client.servers
    .beginCreateAndWait(
      resourceGroupName,
      serverName,
      parameters
    )
    .then((res) => {
      console.log(res);
    });
}

createDatabase()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
