// Azure Storage dependency
import { BlobServiceClient, ContainerClient, BlockBlobClient, BlobUploadCommonResponse} from '@azure/storage-blob';
import { displayToday } from '../timeManagement';
import { getLocalStorage } from '../localStorageManager';

export type UploadProps = {
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
export async function createListPatients() : Promise<string[]> {
  const out : string[] = []
  const userName : string = getLocalStorage("PersonAIUsername", "");
  const blobServiceClient : BlobServiceClient = createStorageServiceClient();
  const containerClient : ContainerClient = blobServiceClient.getContainerClient(userName);
  console.log("create")
  for await (const blob of containerClient.listBlobsFlat()) {
     out.push(blob.name);
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

/**
 * Create container and Upload Initial documents to the patients OR
 * Upload file to existing container
 */

export async function uploadSessionDocument(
  file: Blob,
  fileName: string,
  username: string,
  patientName: string,
): Promise<BlobUploadCommonResponse> {
  const res: BlobUploadCommonResponse = await uploadAction(
    file,
    fileName,
    `${username}/${patientName}/${patientName}_${displayToday()}`,
  );
  return res;
}
