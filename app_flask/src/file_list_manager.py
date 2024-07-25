import os
import asyncio
from azure.storage.blob.aio import BlobServiceClient
from dotenv import load_dotenv
from file_manager import FileManager
from genai_manager import GenAIManager
import docx


class FileListManager:
    def __init__(self, username, file_list):
        load_dotenv()
        self.username = username
        self.file_list = file_list
        self.sas_token = os.getenv("REACT_APP_AZURE_STORAGE_SAS_TOKEN")
        self.storage_account = os.getenv("REACT_APP_AZURE_STORAGE_ACCOUNT")

    async def download_blob_to_file_async(self, blob_service_client, filename):
        directory = os.path.dirname(
            os.path.join(
                "multi_downloads/",
                f"{self.username}-{self.transform_filename(filename)}",
            )
        )
        if not os.path.exists(directory):
            os.makedirs(directory)
        blob_client = blob_service_client.get_blob_client(
            container=self.username, blob=filename
        )
        with open(
            file=os.path.join(
                r"multi_downloads/",
                f"{self.username}-{self.transform_filename(filename)}",
            ),
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
            path = os.path.join(
                r"multi_downloads/", f"{self.username}-{self.transform_filename(f)}"
            )
            if os.path.exists(path):
                os.remove(path)

    def remove_empty_directory(self):
        for root, dirs, _ in os.walk("multi_downloads/", topdown=False):
            for d in dirs:
                dir_path = os.path.join(root, d)
                try:
                    os.rmdir(dir_path)
                    # print(f"Removed empty directory: {dir_path}")
                except OSError:
                    # Directory is not empty
                    pass

    def transform_filename(self, filename):
        return filename.replace("/", "-")

    def list_local_file(self):
        xs = []
        for root, _, files in os.walk("multi_downloads/", topdown=False):
            for r in files:
                if self.username in r:
                    xs.append(os.path.join(root, r))
        return xs

    def compile_all_file(self):
        xs = self.list_local_file()
        out = ""
        # print(xs)
        for f in xs:
            if "docx" in str(f):
                doc = docx.Document(f)
                full_text = [para.text for para in doc.paragraphs]
                out += "\n".join(full_text)
                out += f"\nsession info: {str(f)}\n"
                out += "-" * 100 + "\n"
            elif "txt" in str(f):
                with open(f, "rt") as file:
                    out += file.read()
                out += f"\nsesion info: {str(f)}\n"
                out += "-" * 100 + "\n"
        return out

    async def genai_call_helper(self, prompt):
        try:
            await self.download_all_blob()
            out = self.compile_all_file()
            # print(out)
            genai_manager = GenAIManager(out, prompt)
            return genai_manager.get_ai_response()
        except Exception as exc:
            raise Exception("call fails") from exc
        finally:
            self.delete_all_blobs()
            self.remove_empty_directory()


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
        print(multi_manager.compile_all_file())
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


async def test_multi_filemanager2():
    try:
        file_manager = FileManager("test")
        # use list_blob to find all documents related to a patient
        file_list = file_manager.list_blob("user-test2", "patient1")

        # create multiple-file manager
        multi_manager = FileListManager("user-test2", file_list=file_list)

        # auto process
        out = await multi_manager.genai_call_helper("Summarize the text in 50 words")
        print(out)
    except Exception as exc:
        raise Exception("test fails") from exc


if __name__ == "__main__":
    asyncio.run(test_multi_filemanager2())
