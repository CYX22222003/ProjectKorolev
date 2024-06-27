import Background from "../Components/Background";
import EditorElement from "./EditorElement";
import EditorPrompt from "./EditorPrompt";
import React, { useRef } from "react";

export default function Editor() {
  const patientNameRef: React.MutableRefObject<string> = useRef<string>("");
  const sessionNameRef: React.MutableRefObject<string> = useRef<string>("");
  const fileNameRef: React.MutableRefObject<string> = useRef<string>("");

  return (
    <Background
      elements={[
        <EditorPrompt
          filenameRef={fileNameRef}
          patientNameRef={patientNameRef}
          sessionNameRef={sessionNameRef}
        />,
        <EditorElement
          filenameRef={fileNameRef}
          patientNameRef={patientNameRef}
          sessionNameRef={sessionNameRef}
        />,
      ]}
      header="Editor"
    />
  );
}
