# List Blobs in Storage Containers

This sample uses the Azure JavaScript SDK with [`DefaultAzureCredential`](https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential) to list blobs in Storage Containers.

Packages used:

[@azure/storage-blob](https://www.npmjs.com/package/@azure/storage-blob) 
<br>
[@azure/identity](https://www.npmjs.com/package/@azure/identity)

## Running the sample
- Before running the sample, make sure your local environment is set up correctly. You'll need to either create or use an existing Service Principal. You can follow this [link](https://docs.microsoft.com/en-us/azure/developer/javascript/core/configure-local-development-environment?tabs=bash#one-time-configuration-for-authentication) on how to create a Service Principal.
When using this JavaScript SDK, `DefaultAzureCredential` expects `AZURE_SUBSCRIPTION_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` and `AZURE_TENANT_ID` to be available. This is called out [here](https://docs.microsoft.com/en-us/azure/developer/javascript/core/configure-local-development-environment?tabs=bash#create-environment-variables-for-the-azure-libraries).
- Run `npm install` to install the required dependencies. 
- Run `npm run list-blobs-in-containers.js` to run the sample.
