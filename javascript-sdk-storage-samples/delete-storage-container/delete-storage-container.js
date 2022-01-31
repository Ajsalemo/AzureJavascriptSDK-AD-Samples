const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  defaultAzureCredential
);
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

async function deleteStorageContainer() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  console.log("\nDeleting container...");

  const deleteContainerResponse = await containerClient.delete();
  console.log(
    "Container was deleted successfully. requestId: ",
    deleteContainerResponse.requestId
  );
}

deleteStorageContainer()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
