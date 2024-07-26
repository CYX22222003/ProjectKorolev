import React, { ReactElement, useState } from "react";
import Background from "../Components/Background";
import AudioUploadForm from "./AudioUploadForm";
import MeetingTranscriptionDisplay from "./MeetingTranscriptionDisplay";

export default function MeetingTranscriptionMain(): ReactElement {
  const [display, setDisplay] = useState<string>("");

  return (
    <Background
      elements={[
        <AudioUploadForm setDisplay={setDisplay} />,
        <MeetingTranscriptionDisplay display={display} />,
      ]}
      header="Meeting Transcription"
    />
  );
}
