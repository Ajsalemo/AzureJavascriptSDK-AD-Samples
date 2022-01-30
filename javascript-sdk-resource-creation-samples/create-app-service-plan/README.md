# Create an App Service Plan

This sample uses the Azure JavaScript SDK with [`DefaultAzureCredential`](https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential) to create an App Service Plan.

## Running the sample
- Before running the sample, make sure your local environment is set up correctly. You'll need to either create or use an existing Service Principal. You can follow this [link](https://docs.microsoft.com/en-us/azure/developer/javascript/core/configure-local-development-environment?tabs=bash#one-time-configuration-for-authentication) on how to create a Service Principal.
When using this JavaScript SDK, `DefaultAzureCredential` expects `AZURE_SUBSCRIPTION_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` and `AZURE_TENANT_ID` to be available. This is called out [here](https://docs.microsoft.com/en-us/azure/developer/javascript/core/configure-local-development-environment?tabs=bash#create-environment-variables-for-the-azure-libraries).
- This sample only creates an App Service Plan. This can be changed to target an existing Resource Group if desired, or create a new one.
- Run `npm install` to install the required dependencies. 
- Run `npm run create-app-service-plan.js` to run the sample.
