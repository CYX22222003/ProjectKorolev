from azure.storage.blob import BlobServiceClient
from dotenv import load_dotenv
import docx
import os


class FileManager:
    def __init__(self, dest_name):
        load_dotenv()
        self.sas_token = os.getenv("REACT_APP_AZURE_STORAGE_SAS_TOKEN")
        self.storage_account = os.getenv("REACT_APP_AZURE_STORAGE_ACCOUNT")
        self.dest = "downloads/" + dest_name
        self.blob_service_client = BlobServiceClient(
            self.storage_account, credential=self.sas_token
        )

    def dowload_file(self, container_name, file_name, doc_type):
        blob_client = self.blob_service_client.get_blob_client(
            container_name, blob=file_name
        )
        with open(file=self.dest + "." + doc_type, mode="wb") as sample_blob:
            try:
                download_stream = blob_client.download_blob()
                sample_blob.write(download_stream.readall())
            except Exception as exc:
                raise Exception("Error happens during the file downloading") from exc

    def remove_file(self, doc_type):
        if os.path.exists(self.dest + "." + doc_type):
            os.remove(os.path.join(self.dest + "." + doc_type))
        else:
            print("file does not exists")

    def handle_docx_file(self):
        try:
            doc = docx.Document(self.dest + ".docx")
            full_text = [para.text for para in doc.paragraphs]
            return "\n".join(full_text)
        except Exception as exc:
            raise Exception("The document does not exists") from exc


if __name__ == "__main__":
    file_manager = FileManager("test")
    file_manager.dowload_file(
        "user-test2", "patient1/patient1_01-02-2003/Sample Proposal 24.docx", "docx"
    )
    print(file_manager.handle_docx_file())
    file_manager.remove_file("docx")
