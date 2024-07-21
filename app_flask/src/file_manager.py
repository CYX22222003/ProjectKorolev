from azure.storage.blob import BlobServiceClient
import docx
from dotenv import load_dotenv
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

    def find_doctype(self, file_name):
        start = file_name.index(".")
        return file_name[start:]

    def download_file(self, container_name, file_name):
        blob_client = self.blob_service_client.get_blob_client(
            container_name, blob=file_name
        )
        doc_type = self.find_doctype(file_name)
        with open(file=self.dest + doc_type, mode="wb") as sample_blob:
            try:
                download_stream = blob_client.download_blob()
                sample_blob.write(download_stream.readall())
            except Exception as exc:
                raise Exception("Error happens during the file downloading") from exc

    def upload_file(self, container_name, upload_file_path, file_name):
        container_client = self.blob_service_client.get_container_client(
            container=container_name
        )
        with open(os.path.join(upload_file_path), "rb") as file:
            container_client.upload_blob(name=file_name, data=file, overwrite=True)

    def remove_file(self, file_name):
        if os.path.exists(file_name):
            os.remove(os.path.join(file_name))
        else:
            print("file does not exists")

    def handle_docx_file(self):
        try:
            doc = docx.Document(self.dest + ".docx")
            full_text = [para.text for para in doc.paragraphs]
            return "\n".join(full_text)
        except Exception as exc:
            raise Exception("The document does not exists") from exc

    def handle_txt_file(self):
        with open(self.dest + ".txt", "rt") as file:
            return file.read()

    def list_blob(self, container_name, key):
        container_client = self.blob_service_client.get_container_client(container=container_name)
        xs = container_client.list_blob_names(name_starts_with=key)
        #print(list(xs))
        return list(xs)



def test_file_manager():
    try:
        file_manager = FileManager("test")
        file_manager.download_file(
            "user-test2", "patient1/patient1_01-02-2003/Sample Proposal 24.docx"
        )
        file_manager.handle_docx_file()
        file_manager.upload_file(
            "user-test2",
            "downloads/test.docx",
            "patient1/patient1_01-02-2003/upload_test.docx",
        )
        file_manager.remove_file("downloads/test.docx")

        file_manager.download_file(
            "user-test2", "patient1/patient1_01-02-2003/sample_reddit_blog.txt"
        )
        file_manager.handle_txt_file()
        file_manager.remove_file("downloads/test.txt")

        file_manager.list_blob("user-test2", "patient1")
        return True
    except Exception as exc:
        raise Exception("Test fails") from exc


if __name__ == "__main__":

    print(test_file_manager())
