import { 
  BlobServiceClient, 
  ContainerClient,
  BlobClient
} from '@azure/storage-blob';

import { createStorageServiceClient} from '../utils/Document_Upload/documentManager';

export async function downloadForPreview(containerName : string, blobname : string) : Promise<Blob> {
    const blobServiceClient : BlobServiceClient = createStorageServiceClient();
  const containerClient : ContainerClient = blobServiceClient.getContainerClient(containerName)

  const blobClient : BlobClient = await containerClient.getBlobClient(blobname);
  
  const blob : Blob = await blobClient.download()
  .then(res => {
    console.log(res._response);
    return res.blobBody;})
  .then(data => {
    if(data === undefined) {
      throw new Error("Fail to download");
    } else {
      console.log(typeof(data) + " data is loaded")
      return data;
    }
  }).catch((err : any) => {
    throw new Error(err);
  })

  return blob;
}