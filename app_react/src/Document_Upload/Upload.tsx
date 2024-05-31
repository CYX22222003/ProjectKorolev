import React, { ReactElement, useState } from "react";
import { uploadAction } from "./util";


export default function Upload(): ReactElement {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [containerName, setContainerName] = useState<string>("")

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedFile) {
      uploadAction(selectedFile, selectedFile.name, containerName);
    } else {
      console.error("No file selected");
    }
  };

  return (
    <div>
      <h1>Add Patient</h1>
      <form>
        <label>Create new directory for patient</label>
          <input type="text" onChange={
            (e : React.ChangeEvent<HTMLInputElement>) => {
              setContainerName(e.target.value)
            } } />
      </form>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} /> <br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}
