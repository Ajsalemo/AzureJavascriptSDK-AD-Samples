const { DefaultAzureCredential } = require("@azure/identity");
const { WebSiteManagementClient } = require("@azure/arm-appservice");

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
// Reference: https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential
const credential = new DefaultAzureCredential();

async function createWebApp() {
  const client = new WebSiteManagementClient(credential, subscriptionId);
  const resourceGroupName = process.env.AZURE_RESOURCE_GROUP_NAME;
  const appServicePlanName = process.env.AZURE_APP_SERVICE_PLAN_NAME;
  const webAppName = process.env.AZURE_WEB_APP_NAME;
  const serverFarmId = `/subscriptions/${subscriptionId}//resourceGroups/${resourceGroupName}/providers/Microsoft.Web/serverfarms/${appServicePlanName}`;

  const parameter = {
    kind: "app,linux",
    location: "eastus",
    serverFarmId: serverFarmId,
    siteConfig: {
      linuxFxVersion: "NODE|14-lts",
    },
  };

  await client.webApps
    .beginCreateOrUpdateAndWait(resourceGroupName, webAppName, parameter)
    .then((res) => {
      console.log(res);
    });
}

createWebApp()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
