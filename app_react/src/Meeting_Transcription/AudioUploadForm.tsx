import React, { useState, FormEvent } from "react";
import Typography from "@mui/material/Typography";
import { Button, CircularProgress, TextField } from "@mui/material";
import MySnackbar from "../Components/SnackBar";

type AudioUploadFormProbs = {
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
};

export default function AudioUploadForm({
  setDisplay,
}: AudioUploadFormProbs): React.ReactElement {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

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

    console.log(file);
    const formData = new FormData();
    formData.append("audio", file, "upload_audio.mp3");

    try {
      const address: string = process.env.REACT_APP_TRANSCRIPTION_URL as string;
      const apiKey: string = process.env
        .REACT_APP_TRANSCRIPTION_API_KEY as string;
      setLoading(true);
      const response = await fetch(address, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        credentials: "include",
        headers: {
          Authorization: apiKey,
          "Accept-Encoding": "gzip, deflate, br",
          Connection: "keep-alive",
        },
        body: formData,
      }).then((res) => {
        setLoading(false);
        return res;
      });

      if (response.ok) {
        const data = await response.json();
        setDisplay(data["script"] as string);
      } else {
        setErrorState(true);
        setErrorMessage("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setErrorMessage("Error uploading file.");
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <Typography sx={{
           padding: "12px 24px",
           fontSize: "23px",
           minWidth: "150px",
         }}>
          Upload Audio/Video:
        </Typography>
        <br />
        <TextField type="file" onChange={handleFileChange} />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Upload
        </Button>
      </form>
      {loading && <CircularProgress />}
      {errorState && (
        <MySnackbar
          open={errorState}
          setOpen={setErrorState}
          message={errorMessage}
        />
      )}
    </React.Fragment>
  );
}
