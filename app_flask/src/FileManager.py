from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient, BlobClient, ContainerClient
from dotenv import load_dotenv
import os


class FileManager:
    def __init__(self):
        load_dotenv()
        self.sas_token = os.getenv("REACT_APP_AZURE_STORAGE_SAS_TOKEN")
        self.storage_account = os.getenv("REACT_APP_AZURE_STORAGE_ACCOUNT")
        self.dest = "./dowloads"
        self.blob_service_client = BlobServiceClient(
            self.storage_account, credential=self.sas_token
        )

    def dowload_file(self, fileName):
        pass
