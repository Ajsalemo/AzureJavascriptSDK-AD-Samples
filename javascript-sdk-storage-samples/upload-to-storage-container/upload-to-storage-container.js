const { DefaultAzureCredential } = require("@azure/identity");
const { BlobServiceClient } = require("@azure/storage-blob");

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;
const defaultAzureCredential = new DefaultAzureCredential();

const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  defaultAzureCredential
);

const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

async function uploadToStorageContainer() {
  const containerClient = blobServiceClient.getContainerClient(containerName);

  const content = "Hello world!";
  const blobName = `newblob${new Date().getTime()}.txt`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);
}

uploadToStorageContainer()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));