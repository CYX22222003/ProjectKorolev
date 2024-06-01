import React, { ReactElement, useState } from "react";
import { uploadAction } from "./util";
import { TextField, Button } from "@mui/material";

export default function Upload(): ReactElement {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [containerName, setContainerName] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile && containerName) {
      const statusCode: number = await uploadAction(
        selectedFile,
        selectedFile.name,
        containerName,
      ).then((res) => res._response.status);
      if (statusCode === 201) {
        alert("File successfully is uploaded");
      }
    } else {
      alert("Key in both directory and file to submit");
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
    </div>
  );
}
