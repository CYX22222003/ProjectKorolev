import React, { ReactElement, useState } from "react";
import {
  UploadProps,
  uploadAction,
} from "../utils/Document_Upload/documentManager";
import { TextField, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import MySnackbar from "./SnackBar";

export default function Upload({
  title,
  containerName,
}: UploadProps): ReactElement {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showWarning, setWarningState] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (selectedFile && containerName) {
      const statusCode: number = await uploadAction(
        selectedFile,
        selectedFile.name,
        containerName,
      )
        .then((res) => {
          setLoading(false);
          return res._response.status;
        })
        .catch((err) => {
          setLoading(false);
          setWarningMessage("Fail to submit ");
          setWarningState(true);
          console.error(err);
          return 0;
        });
      if (statusCode === 201) {
        setWarningMessage("File is successfully uploaded");
        setWarningState(true);
      }
    } else {
      setWarningMessage("Key in both directory and file to submit");
      setWarningState(true);
      console.error("No file selected");
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <form onSubmit={handleSubmit}>
        <TextField type="file" onChange={handleFileChange} /> <br />
        <br />
        <Button variant="contained" type="submit">
          Upload
        </Button>
      </form>
      <MySnackbar
        open={showWarning}
        setOpen={setWarningState}
        message={warningMessage}
      />{" "}
      <br />
      {loading && <CircularProgress />}
    </div>
  );
}
