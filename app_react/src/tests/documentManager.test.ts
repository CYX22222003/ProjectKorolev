import { 
    createStorageServiceClient, 
    createInnerContainer,
    downloadFileFromBrowser,
    deleteBlob,
    downLoadDocument,
    uploadAction,
    createListBlobs,
    createListContextBlobs,
    createNewUserContainer
} from "../utils/Document_Upload/documentManager";

import { BlobServiceClient, BlockBlobClient, ContainerClient, BlobClient } from "@azure/storage-blob";

jest.mock('@azure/storage-blob', () => {
    return {
        BlobServiceClient: jest.fn().mockImplementation(() => ({
            createContainer: jest.fn()
        })),
        
        ContainerClient : jest.fn().mockImplementation(() => ({
            getBlobClient : jest.fn()
        })),
        
        BlobClient : jest.fn().mockImplementation(() => ({
            download : jest.fn()
        })),

        BlockBlobClient : jest.fn().mockImplementation(() => ({
            getBlockBlobClient : jest.fn()
        }))
    };
});

const originalEnv = process.env;

describe("Test Azure Storage Service Client creation", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env = { ...originalEnv };
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    it("Invalid token", async () => {
        process.env.REACT_AZURE_STORAGE_SAS_TOKEN = undefined;

        expect(()=>createStorageServiceClient())
        .toThrow("undefined token or address");
    })

    it("Invalid address", async () => {
        process.env.REACT_APP_AZURE_STORAGE_ACCOUNT = undefined;

        expect(() => createStorageServiceClient())
        .toThrow("undefined token or address");
    })

     it('Creates a BlobServiceClient instance with the correct SAS URL', () => {
        process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN = 'fake_sas_token';
        process.env.REACT_APP_AZURE_STORAGE_ACCOUNT = 'https://fakeaccount.'
                                            + 'blob.core.windows.net';
        createStorageServiceClient();

        const expectedSasUrl = 'https://fakeaccount.blob.core.' 
            + 'windows.net?fake_sas_token';
        expect(BlobServiceClient)
        .toHaveBeenCalledWith(expectedSasUrl,undefined);
    });
})

describe("Test Azure Container creation", () => {
    let mockBlobServiceClient : jest.Mocked<BlobServiceClient>;
    let mockContainerService : jest.Mocked<ContainerClient>;

    beforeEach(() => {
        process.env = { ...originalEnv };
        process.env.REACT_APP_AZURE_STORAGE_SAS_TOKEN = 'fake_sas_token';
        process.env.REACT_APP_AZURE_STORAGE_ACCOUNT = 'https://fakeaccount.'
                                            + 'blob.core.windows.net';
        mockBlobServiceClient = new BlobServiceClient("test", undefined) as jest.Mocked<BlobServiceClient>;
        mockContainerService = new ContainerClient("fake_string", "test-container") as jest.Mocked<ContainerClient>;

        (mockBlobServiceClient.createContainer as jest.Mock).mockResolvedValue({
            containerClient: mockContainerService
        });
    });

    afterEach(() => {
        process.env = {...originalEnv}
        jest.clearAllMocks()
    })

    it("Create Azure Container", async () => {
        const containerName = 'test-container';
        const result = await createInnerContainer(mockBlobServiceClient, containerName);
        expect(mockBlobServiceClient.createContainer).toHaveBeenCalledWith("test-container");
        expect(result).toBe(mockContainerService)
    })
})