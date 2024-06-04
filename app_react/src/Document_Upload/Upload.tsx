import React, { ReactElement, useState } from "react";
import { uploadAction } from "./util";
import { TextField, Button } from "@mui/material";
import { Warning } from "../Components/Warning";
import CircularProgress from "@mui/material/CircularProgress";

export default function Upload(): ReactElement {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [containerName, setContainerName] = useState<string>("");
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
      <h1>Add Patient Feature Test</h1>
      <form>
        <TextField
          type="text"
          label="directory"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setContainerName(e.target.value);
          }}
        />
      </form>
      <form onSubmit={handleSubmit}>
        <TextField type="file" onChange={handleFileChange} /> <br />
        <br />
        <Button variant="contained" type="submit">
          Upload
        </Button>
      </form>
      <Warning
        open={showWarning}
        setOpen={setWarningState}
        text={warningMessage}
      />{" "}
      <br />
      {loading && <CircularProgress />}
    </div>
  );
}
