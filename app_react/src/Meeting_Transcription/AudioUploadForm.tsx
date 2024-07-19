import React, { useState, FormEvent } from "react";
import { postTest } from "../utils/APIInteractionManager";

export default function AudioUploadForm(): React.ReactElement {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      alert("Please select a file first.");
      return;
    }

    console.log(file)
    const formData = new FormData();
    formData.append("audio", file, "upload_audio.mp3");
    console.log(formData.keys())
    try {
      const address: string = process.env.REACT_APP_TRANSCRIPTION_URL as string;
      const apiKey : string = process.env.REACT_APP_TRANSCRIPTION_API_KEY as string;

      const response = await fetch(address, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        credentials: "include",
        headers: {
          "Authorization": apiKey,
          "Accept-Encoding": "gzip, deflate, br",
          "Connection": "keep-alive",
        },
        body: formData,
      });

      if (response.ok) {
        alert("File uploaded successfully!");
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file.");
    }
  };

  return (
    <React.Fragment>
        <form onSubmit={handleSubmit}>
            <label>
                Upload Audio/Video:
                <input type="file" onChange={handleFileChange} />
            </label>
            <button type="submit">Upload</button>
        </form>
    </React.Fragment>
  );
}
