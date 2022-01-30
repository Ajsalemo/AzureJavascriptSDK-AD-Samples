const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING

async function main() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerName = "quickstart" + uuidv1();

  console.log("\nCreating container...");
  console.log("\t", containerName);

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const createContainerResponse = await containerClient.create();
  console.log(
    "Container was created successfully. requestId: ",
    createContainerResponse.requestId
  );
}

main()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
