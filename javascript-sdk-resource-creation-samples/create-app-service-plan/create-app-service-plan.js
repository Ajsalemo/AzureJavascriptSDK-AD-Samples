const { DefaultAzureCredential } = require("@azure/identity");
const { WebSiteManagementClient } = require("@azure/arm-appservice");

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
// Reference: https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential
const credential = new DefaultAzureCredential();

async function createAppServicePlan() {
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resourceGroupName = process.env.AZURE_RESOURCE_GROUP_NAME;
  const appServicePlanName = process.env.AZURE_APP_SERVICE_PLAN_NAME;

  const parameter = {
    kind: "app,linux",
    location: "eastus",
    sku: {
      name: "B1",
    },
    // We'll make this a Linux App Service Plan
    // Reference: https://docs.microsoft.com/en-us/azure/templates/microsoft.web/2018-02-01/serverfarms?tabs=json#appserviceplanproperties
    reserved: true,
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
