const { DefaultAzureCredential } = require("@azure/identity");
const { WebSiteManagementClient } = require("@azure/arm-appservice");

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
// Reference: https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential
const credential = new DefaultAzureCredential();

async function createAppServicePlan() {
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resourceGroupName = "newresourcegroup";
  const appServicePlanName = "newappserviceplan";

  const parameter = {
    kind: "app",
    location: "eastus",
    sku: {
      name: "P1",
      tier: "Premium",
      size: "P1",
      family: "P",
      capacity: 1,
    },
  };
  await client.appServicePlans
    .beginCreateOrUpdateAndWait(
      resourceGroupName,
      appServicePlanName,
      parameter
    )
    .then((res) => {
      console.log(res);
    });
}

createAppServicePlan()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
