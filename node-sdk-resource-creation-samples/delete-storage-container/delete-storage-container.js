const { BlobServiceClient } = require("@azure/storage-blob");

const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

async function main() {
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

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
