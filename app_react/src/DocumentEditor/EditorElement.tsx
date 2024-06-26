import { StarterKit } from "@tiptap/starter-kit";
import { RichTextEditor, RichTextEditorRef } from "mui-tiptap";
import EditorMenuControls from "./EditorMenu";
import Button from "@mui/material/Button";
import React, { useRef, useState } from "react";
import { BoxConfigProps, EditorTemplateProps } from "./util";
import { uploadAction } from "../utils/Document_Upload/documentManager";
import { getLocalStorage } from "../utils/localStorageManager";
import { EditorTitleInput } from "./EditorPromptHelp";
import Box from "@mui/material/Box";
import MySnackbar from "../Components/SnackBar";
import CircularProgress from "@mui/material/CircularProgress";

export default function EditorElement({
  filenameRef,
  patientNameRef,
  sessionNameRef,
}: EditorTemplateProps) {
  const rteRef = useRef<RichTextEditorRef>(null);
  const [sentBody, setSentBody] = useState<string>("");
  const [startProgress, setStartProgress] = useState<boolean>(false);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [openError, setOpenError] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Box sx={BoxConfigProps}>
        <EditorTitleInput filenameRef={filenameRef} />
      </Box>
      <Box>
        <RichTextEditor
          extensions={[StarterKit]}
          renderControls={() => <EditorMenuControls />}
          content=""
          ref={rteRef}
          onUpdate={(data: any) => {
            setSentBody(data?.editor.getHTML() ?? "");
          }}
        />
      </Box>
      <Box>
        <Button
          type="submit"
          color="info"
          disabled={
            sentBody.trim() === "" ||
            filenameRef.current.trim() === "" ||
            patientNameRef.current.trim() === "" ||
            sessionNameRef.current.trim() === ""
          }
          onClick={async () => {
            setStartProgress(true);
            try {
              setSentBody(rteRef.current?.editor?.getHTML() ?? "");
              const sentBlob: Blob = new Blob([sentBody], {
                type: "text/plain",
              });
              console.log(sentBody);
              await uploadAction(
                sentBlob,
                `${filenameRef.current}.txt`,
                `${getLocalStorage("PersonAIUsername", "")}` +
                  `/${patientNameRef.current}/${sessionNameRef.current}`,
              );
              setOpenToast(true);
              setStartProgress(false);
            } catch (err: any) {
              setStartProgress(false);
              setOpenError(true);
              console.log(err);
            }
          }}
        >
          Submit
        </Button>
      </Box>
      {startProgress && <CircularProgress />}
      {
        <MySnackbar
          open={openToast}
          setOpen={setOpenToast}
          message="Uploaded successfully"
        />
      }
      {
        <MySnackbar
          open={openError}
          setOpen={setOpenError}
          message="Fail to upload"
        />
      }
    </React.Fragment>
  );
}
