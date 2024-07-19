import React, { ReactElement } from "react";
import Background from "../Components/Background";
import AudioUploadForm from "./AudioUploadForm";

export default function MeetingTranscriptionMain() : ReactElement {

    return (
        <Background 
            elements={[<AudioUploadForm />]}

            header="Meeting Transcription"
        />
    )
}