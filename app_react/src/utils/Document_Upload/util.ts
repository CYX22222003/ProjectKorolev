// Azure Storage dependency
import { BlobServiceClient, ContainerClient, BlockBlobClient, BlobUploadCommonResponse, BlobClient} from '@azure/storage-blob';
//import { getLocalStorage } from '../localStorageManager';

export type UploadProps = {
  title : string
  containerName : string
}

export function createStorageServiceClient() : BlobServiceClient {
    // SAS token must have LIST permissions on container that haven't expired
    const sasToken : string | undefined = process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN;
    const address : string | undefined = process.env.REACT_APP_AZURE_STORAGE_ACCOUNT;
    if (sasToken === undefined || address === undefined) {
        throw new Error("undefined token or address");
    }
    // Create SAS URL
    const sasUrl : string = address + "?" + sasToken
    // SAS tokens do not require an additional credential because
    // the token is the credential
    const credential = undefined;
    return new BlobServiceClient(sasUrl, credential);
}

export async function createInnerContainer(storageClient : BlobServiceClient, containerName : string) : Promise<ContainerClient> {
    const containerClient  = await storageClient
                .createContainer(containerName)
                .then(res => res.containerClient);

    return containerClient;
}

export async function downLoadDocument(containerName: string, blobname: string) : Promise<void> {
  const blobServiceClient : BlobServiceClient = createStorageServiceClient();
  const containerClient : ContainerClient = blobServiceClient.getContainerClient(containerName)

  const blobClient : BlobClient = await containerClient.getBlobClient(blobname);
  await blobClient.download()
  .then(res => res.blobBody)
  .then(data => {
    if(data === undefined) {
      throw new Error("Fail to download");
    } else {
      return data;
    }
  }).then((blob : Blob) => {
    const url = window.URL.createObjectURL(
      new Blob([blob]),
    );
    const link = document.createElement('a');
    link.href = url;
     link.setAttribute(
      'download',
      "Downloads" + blob.type
    );
    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    if(link.parentNode !== null) {
      link.parentNode.removeChild(link);
    }
  })
  .catch(err => {
    console.log("Fail to download");
    throw new Error("Fail to download");
  });
}


export async function uploadAction(file : Blob, fileName : string, containerName : string): Promise<BlobUploadCommonResponse> {
    const blobServiceClient = createStorageServiceClient();

    const containerClient : ContainerClient = await createInnerContainer(blobServiceClient, containerName)
                                            .catch((err) => blobServiceClient.getContainerClient(containerName));

    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(fileName);

    
    // Specify data transfer options   
    const res : BlobUploadCommonResponse = await blockBlobClient.uploadData(file);
    return res;
}

/**
 * Display list of patients
 * 
*/
export async function createListBlobs(containerName : string, directory : string, key : string) : Promise<string[]> {
  const out : string[] = [];

  const regx : RegExp = new RegExp(key, "i");

  const blobServiceClient : BlobServiceClient = createStorageServiceClient();
  const containerClient : ContainerClient = blobServiceClient.getContainerClient(containerName);
  for await (const blob of containerClient.listBlobsByHierarchy(directory)) {
    if (regx.test(blob.name)) {
     out.push(blob.name);
    }
  }
  return out;
}



/**
 * Create a container for each user when they sign up
 *
 */
export async function createNewUserContainer(userName: string) {
  const storageService: BlobServiceClient = createStorageServiceClient();
  await createInnerContainer(storageService, `${userName}`);
}

