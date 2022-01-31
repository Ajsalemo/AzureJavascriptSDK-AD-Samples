const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  defaultAzureCredential
);

async function listStorageContainers() {
  let i = 1;
  let containers = blobServiceClient.listContainers();
  for await (const container of containers) {
    console.log(`Container ${i++}: ${container.name}`);
  }
}

listStorageContainers()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
