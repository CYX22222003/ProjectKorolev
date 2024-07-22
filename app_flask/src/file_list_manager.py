import os
import asyncio
from azure.storage.blob.aio import BlobServiceClient
from dotenv import load_dotenv
import os
from file_manager import FileManager


class FileListManager:
    def __init__(self, username, file_list):
        load_dotenv()
        self.username = username
        self.file_list = file_list
        self.sas_token = os.getenv("REACT_APP_AZURE_STORAGE_SAS_TOKEN")
        self.storage_account = os.getenv("REACT_APP_AZURE_STORAGE_ACCOUNT")

    async def download_blob_to_file_async(self, blob_service_client, filename):
        directory = os.path.dirname(
            os.path.join("multi_downloads/", f"{self.username}-{filename}")
        )
        if not os.path.exists(directory):
            os.makedirs(directory)
        blob_client = blob_service_client.get_blob_client(
            container=self.username, blob=filename
        )
        with open(
            file=os.path.join(r"multi_downloads/", f"{self.username}-{filename}"),
            mode="wb",
        ) as sample_blob:
            download_stream = await blob_client.download_blob()
            data = await download_stream.readall()
            sample_blob.write(data)

    async def download_all_blob(self):
        blob_service_client = BlobServiceClient(self.storage_account, self.sas_token)
        commands = [
            self.download_blob_to_file_async(blob_service_client, f)
            for f in self.file_list
        ]
        await asyncio.gather(*commands)
        await blob_service_client.close()

    def delete_all_blobs(self):
        for f in self.file_list:
            path = os.path.join(r"multi_downloads/", f"{self.username}-{f}")
            if os.path.exists(path):
                os.remove(path)

    def remove_empty_directory(self):
        for root, dirs, files in os.walk("multi_downloads/", topdown=False):
            for dir in dirs:
                dir_path = os.path.join(root, dir)
                try:
                    os.rmdir(dir_path)
                    # print(f"Removed empty directory: {dir_path}")
                except OSError:
                    # Directory is not empty
                    pass


async def test_multi_filemanager():
    try:
        file_manager = FileManager("test")
        # use list_blob to find all documents related to a patient
        file_list = file_manager.list_blob("user-test2", "patient1")

        # create multiple-file manager
        multi_manager = FileListManager("user-test2", file_list=file_list)

        # download all documents related to the patient
        await multi_manager.download_all_blob()
        print("All file downloads")
        await asyncio.sleep(2)
        
        # clear all documents after processing
        if input("clear?") == "y":
            multi_manager.delete_all_blobs()
            multi_manager.remove_empty_directory()
        else:
            await asyncio.sleep(10)
            multi_manager.delete_all_blobs()
            multi_manager.remove_empty_directory()
    except Exception as exc:
        raise Exception("test fails") from exc


if __name__ == "__main__":
    asyncio.run(test_multi_filemanager())
