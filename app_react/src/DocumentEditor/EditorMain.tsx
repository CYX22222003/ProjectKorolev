import Background from "../Components/Background";
import EditorElement from "./EditorTemplate";
import EditorPrompt from "./EditorPrompt";
import { useRef } from "react";

export default function Element() {
  const patientNameRef: React.MutableRefObject<string> = useRef<string>("");
  const sessionNameRef: React.MutableRefObject<string> = useRef<string>("");

  return (
    <Background
      elements={[
        <EditorPrompt
          patientNameRef={patientNameRef}
          sessionNameRef={sessionNameRef}
        />,
        <EditorElement
          patientNameRef={patientNameRef}
          sessionNameRef={sessionNameRef}
        />,
      ]}
      header="Editor"
    />
  );
}
