const { BlobServiceClient } = require("@azure/storage-blob");
const { v1: uuidv1 } = require("uuid");

// Set the storage container name and connection strings to constants
const AZURE_STORAGE_CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME;
const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;

async function uploadToStorageContainer() {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  // Get the Container name
  const containerClient = blobServiceClient.getContainerClient(
    AZURE_STORAGE_CONTAINER_NAME
  );
  // Get the Blob name and set it to a text file that we can upload
  const blobName = "quickstart" + uuidv1() + ".txt";
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.log("\nUploading to Azure storage as blob:\n\t", blobName);

  // 'data' is the contents of the text file
  const data = "Hello, World!";
  const uploadBlobResponse = await blockBlobClient.upload(data, data.length);
  console.log(
    "Blob was uploaded successfully. requestId: ",
    uploadBlobResponse.requestId
  );
}

uploadToStorageContainer()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
