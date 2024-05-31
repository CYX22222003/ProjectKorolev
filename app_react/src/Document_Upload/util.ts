// Azure Storage dependency
import { BlobServiceClient, ContainerClient, BlockBlobClient, ContainerCreateOptions} from '@azure/storage-blob';

function createStorageServiceClient(containerName : string | null) : BlobServiceClient {
    // SAS token must have LIST permissions on container that haven't expired
    const sasToken : string | undefined = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
    const address : string | undefined = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT;
    if (sasToken === undefined || address === undefined) {
        throw new Error("undefined token or address");
    }
    // Create SAS URL
    const sasUrl : string = containerName === null
                            ? address + "?" + sasToken
                            : address + "/" + containerName + "?" + sasToken;
    // SAS tokens do not require an additional credential because
    // the token is the credential
    const credential = undefined;
    return new BlobServiceClient(sasUrl, credential);
}

async function createContainer(storageClient : BlobServiceClient, containerName : string) : Promise<ContainerClient> {
    const containerClient  = await storageClient
                .createContainer(containerName)
                .then(res => res.containerClient);

    return containerClient;
}


export async function uploadAction(file : Blob, fileName : string, containerName : string): Promise<void> {
    const blobServiceClient = createStorageServiceClient(null);

    const containerClient : ContainerClient = await createContainer(blobServiceClient, containerName)
                                            .catch((err) => blobServiceClient.getContainerClient(containerName));

    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(fileName);

    
    // Specify data transfer options   
    await blockBlobClient.uploadData(file);
}
