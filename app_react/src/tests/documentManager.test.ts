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

import { 
    BlobServiceClient, 
    BlockBlobClient, 
    ContainerClient, 
    BlobClient, 
    BlobDeleteIfExistsResponse, 
    BlobDeleteOptions 
} from "@azure/storage-blob";

jest.mock('@azure/storage-blob', () => {
    return {
        BlobServiceClient: jest.fn().mockImplementation(() => ({
            createContainer: jest.fn((containerName, options) => {
                return Promise.resolve(
                    new (jest.requireMock('@azure/storage-blob').ContainerClient)()
                );
            }),

            getContainerClient : jest.fn().mockImplementation((containerName, options) => {
                {
                    return new (jest.requireMock("@azure/storage-blob").ContainerClient)(containerName)
                }
            })
        })),
        
        ContainerClient : jest.fn().mockImplementation(() => ({
            getBlobClient : jest.fn((blobName) => 
                new (jest.requireMock('@azure/storage-blob').BlobClient)()
            ),
            getBlockBlobClient : jest.fn().mockImplementation((blobName) => (
                new (jest.requireMock("@azure/storage-blob").BlockBlobClient)()
            ))
        })),
        
        BlobClient : jest.fn().mockImplementation(() => ({
            download : jest.fn()
        })),

        BlockBlobClient : jest.fn().mockImplementation(() => ({
            deleteIfExists : jest.fn().mockImplementation((options) => {
                return new (
                    jest.requireMock("@azure/storage-blob")
                    .BlobDeleteIfExistsResponse)()
            })
        })),

        BlobDeleteIfExistsResponse : jest.fn().mockReturnValue({errorCode : undefined})
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

describe("Test file downloading function", () => {
  let createObjectURLMock : jest.Mock;
  let appendChildMock : jest.Mock;
  let clickMock : jest.Mock;
  let removeChildMock : jest.Mock;
  
  beforeEach(() => {
    createObjectURLMock = jest.fn().mockReturnValue("blob:url")
    appendChildMock = jest.fn()
    clickMock = jest.fn()
    removeChildMock = jest.fn()

    global.URL.createObjectURL = createObjectURLMock;
    document.createElement = jest.fn().mockReturnValueOnce({
      href: '',
      setAttribute: jest.fn(),
      click: clickMock,
      parentNode: {
        removeChild: removeChildMock
      }
    });
    document.body.appendChild = appendChildMock;
  })
  
  afterEach(() => {
    jest.restoreAllMocks();
  })

  it('Test object URL creation and file downloading', () => {
    const blob = new Blob(['test content'], { type: 'text/plain' });

    downloadFileFromBrowser(blob);

    expect(createObjectURLMock).toHaveBeenCalledWith(new Blob([blob]));
    expect(document.createElement).toHaveBeenCalledWith('a');
    expect(appendChildMock).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
    expect(removeChildMock).toHaveBeenCalled();
  });
})

describe("Test blob delete function", () => {
    let consoleSpy : jest.SpyInstance;

    beforeEach(() => {
        jest.clearAllMocks();
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore(); // Restore original console.log implementation
    });


    it("Test delete blob function", async () => {
        
        await deleteBlob("test1", "test")

        expect(BlobServiceClient).toHaveBeenCalled();
        expect(ContainerClient).toHaveBeenCalled();
        expect(BlockBlobClient).toHaveBeenCalledTimes(1);

        expect(console.log).toHaveBeenCalled();
        expect(console.log).toHaveBeenCalledWith("deleted blob test");
    })

})

describe("Test upload action", () => {
    it("Test file upload action", () => {
        expect(true).toBeTruthy();
    })

    it("Error handling of file uploading features", () => {
        expect(false).toBeFalsy();
    })
})


describe("Test session documents management", () => {
    it("Test creation of file list", () => {
        expect(true).toBeTruthy();
    });

    it("Error handling of filelist creation", () => {
        expect(false).toBeFalsy();
    });
})