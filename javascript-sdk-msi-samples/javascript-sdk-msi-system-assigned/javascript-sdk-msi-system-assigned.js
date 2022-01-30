const { ManagedIdentityCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const credential = new ManagedIdentityCredential();

const AZURE_KEY_VAULT_NAME = process.env.AZURE_KEY_VAULT_NAME;
const url = `https://${AZURE_KEY_VAULT_NAME}.vault.azure.net`;
const client = new SecretClient(url, credential);

async function getKeyvaultSecretWithMSI() {
  const secretName = process.env.AZURE_KEY_VAULT_SECRET_NAME;
  const result = await client.getSecret(secretName);
  console.log(result);
}

getKeyvaultSecretWithMSI()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
