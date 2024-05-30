// Azure Storage dependency
import { BlobServiceClient, ContainerClient, BlockBlobClient} from '@azure/storage-blob';

export async function uploadAction(file : Blob, fileName : string): Promise<void> {
    // Container must exist prior to running this script
    const containerName : string = "test";

    // SAS token must have LIST permissions on container that haven't expired
    const sasToken : string | undefined = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
    const address : string | undefined = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT;
    
    if (sasToken === undefined || address === undefined) {
        throw new Error("undefined token or address");
    }

    // Create SAS URL
    const sasUrl : string = address+"/" + containerName + "?" + sasToken;

    // SAS tokens do not require an additional credential because
    // the token is the credential
    const credential = undefined;

    const blobServiceClient = new BlobServiceClient(sasUrl, credential);
    

    // create container client
    const containerClient : ContainerClient = await blobServiceClient.getContainerClient(containerName);

    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(fileName);

    
    // Specify data transfer options   
    await blockBlobClient.uploadData(file);
    //await blockBlobClient.uploadFile(add);
}
