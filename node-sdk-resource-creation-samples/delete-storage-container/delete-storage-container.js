const { BlobServiceClient } = require("@azure/storage-blob");

// Set the storage container name and connection strings to constants
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

async function deleteStorageContainer() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  // Get the Container name
  const containerClient = blobServiceClient.getContainerClient(
    AZURE_STORAGE_CONTAINER_NAME
  );

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
