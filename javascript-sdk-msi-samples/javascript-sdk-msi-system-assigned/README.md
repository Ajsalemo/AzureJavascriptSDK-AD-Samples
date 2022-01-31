# System Assigned Identity example

This sample uses the Azure JavaScript SDK with [`ManagedIdentityCredential`](https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#managed-identity-support) to read secrets from the Key Vault.

Packages used:

[@azure/keyvault-secrets](https://www.npmjs.com/package/@azure/keyvault-secrets) 
<br>
[@azure/identity](https://www.npmjs.com/package/@azure/identity)

[Services that support Managed Identities](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/managed-identities-status)

## Running the sample
- This sample requires this to be ran on some type of resource that supports System Assigned Identity. You can follow [this quick guide](https://docs.microsoft.com/en-us/azure/active-directory/managed-identities-azure-resources/qs-configure-portal-windows-vm#system-assigned-managed-identity) on how to enable it and assign the System Identity to the resource you're using for this sample.
- Run `npm install` to install the required dependencies. 
- Run `npm run javascript-sdk-msi-system-assigned.js` to run the sample.
