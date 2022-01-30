const { DefaultAzureCredential } = require("@azure/identity");
const { ResourceManagementClient } = require("@azure/arm-resources");

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
// Reference: https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential
const credential = new DefaultAzureCredential();

async function createResourceGroup() {
  const resourceGroupName = process.env.AZURE_RESOURCE_GROUP_NAME;

  const parameter = {
    location: "eastus",
    tags: {
      tag1: "value1",
    },
  };
  const resourcesClient = new ResourceManagementClient(
    credential,
    subscriptionId
  );
  await resourcesClient.resourceGroups
    .createOrUpdate(resourceGroupName, parameter)
    .then((result) => {
      console.log(result);
    });
}

createResourceGroup()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
