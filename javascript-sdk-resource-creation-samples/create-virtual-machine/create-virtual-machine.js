const { ComputeManagementClient } = require("@azure/arm-compute");
const { DefaultAzureCredential } = require("@azure/identity");
const { NetworkManagementClient } = require("@azure/arm-network");

const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
// Reference: https://docs.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential
const credential = new DefaultAzureCredential();
const location = "eastus";
const resourceGroupName = process.env.AZURE_RESOURCE_GROUP_NAME;
const networkName = process.env.AZURE_NETWORK_NAME;
const subnetName = process.env.AZURE_SUBNET_NAME;
const interfaceName = process.env.AZURE_NETWORK_INTERFACE_NAME;
const virtualMachineName = process.env.AZURE_VIRTUAL_MACHINE_NAME;
const virtualMachineUsername = process.env.AZURE_VIRTUAL_MACHINE_USERNAME;
const virtualMachinePassword = process.env.AZURE_VIRTUAL_MACHINE_PASSWORD;

// A Virtual Machine requires having some networking components defined or created before provisioning
// Below we create the Virtual Network
async function createVirtualNetwork(networkClient) {
  const parameter = {
    location: location,
    addressSpace: {
      addressPrefixes: ["10.0.0.0/16"],
    },
  };
  const virtualNetworksCreateInfo =
    await networkClient.virtualNetworks.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkName,
      parameter
    );
  console.log(virtualNetworksCreateInfo);

  const subnetParameter = {
    addressPrefix: "10.0.0.0/24",
  };
  const subnetCreateInfo =
    await networkClient.subnets.beginCreateOrUpdateAndWait(
      resourceGroupName,
      networkName,
      subnetName,
      subnetParameter
    );
  console.log(subnetCreateInfo);
}

// Below we create the NIC
async function createNetworkInterface(networkClient) {
  const parameter = {
    location: location,
    ipConfigurations: [
      {
        name: "MyIpConfig",
        subnet: {
          id: `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/virtualNetworks/${networkName}/subnets/${subnetName}`,
        },
      },
    ],
  };
  const nicInfo =
    await networkClient.networkInterfaces.beginCreateOrUpdateAndWait(
      resourceGroupName,
      interfaceName,
      parameter
    );
  console.log(nicInfo);
}

async function createVirtualMachine() {
  const client = new ComputeManagementClient(credential, subscriptionId);
  const networkClient = new NetworkManagementClient(credential, subscriptionId);
  await createVirtualNetwork(networkClient);
  await createNetworkInterface(networkClient);

  const parameter = {
    location: location,
    storageProfile: {
      imageReference: {
        publisher: "Canonical",
        offer: "UbuntuServer",
        sku: "18.04-LTS",
        version: "latest",
      },
    },
    hardwareProfile: {
      vmSize: "Standard_DS1_v2",
    },
    osProfile: {
      computerName: virtualMachineName,
      adminUsername: virtualMachineUsername,
      adminPassword: virtualMachinePassword,
    },
    networkProfile: {
      networkInterfaces: [
        {
          id: `/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Network/networkInterfaces/${interfaceName}`,
          primary: true,
        },
      ],
    },
  };
  await client.virtualMachines.beginCreateOrUpdateAndWait(
    resourceGroupName,
    virtualMachineName,
    parameter
  );
}

createVirtualMachine()
  .then(() => console.log("Done"))
  .catch((ex) => console.log(ex.message));
