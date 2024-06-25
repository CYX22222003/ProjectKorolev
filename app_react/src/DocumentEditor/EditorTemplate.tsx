import { StarterKit } from "@tiptap/starter-kit";
import { RichTextEditor, RichTextEditorRef } from "mui-tiptap";
import EditorMenuControls from "./EditorMenu";
import Button from "@mui/material/Button";
import React, { useRef, useState } from "react";
import { EditorTemplateProps} from "./util";
import { uploadAction } from "../utils/Document_Upload/documentManager";
import { getLocalStorage } from "../utils/localStorageManager";

export default function EditorElement({
  patientNameRef,
  sessionNameRef,
}: EditorTemplateProps) {
  const rteRef = useRef<RichTextEditorRef>(null);
  const [sentBody, setSentBody] = useState<string>("");

  return (
    <React.Fragment>
      <RichTextEditor
        extensions={[StarterKit]}
        renderControls={() => <EditorMenuControls />}
        content=""
        ref={rteRef}
        onUpdate={((data : any) => {
          setSentBody(data?.editor.getHTML()??"")
        })}
      />
      <Button
        type="submit"
        color="info"
        onClick={async () => {
          try {
            setSentBody(rteRef.current?.editor?.getHTML()??"");
            const sentBlob: Blob = new Blob([sentBody], { type: "text/plain" });
            console.log(sentBody)
            await uploadAction(
              sentBlob,
              "local-test-file.txt",
              `${getLocalStorage("PersonAIUsername", "")}`
              + `/${patientNameRef.current}/${sessionNameRef.current}`,
            );
          } catch (err: any) {
            alert("Error");
            console.log(err);
          }
        }}
      >
        Submit
      </Button>
    </React.Fragment>
  );
}
