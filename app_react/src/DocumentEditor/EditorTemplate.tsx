import { useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { RichTextEditorProvider, RichTextField } from "mui-tiptap";
import EditorMenuControls from "./EditorMenu";
import React from "react";

export default function EditorElement() {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });
  return (
    <React.Fragment>
      <RichTextEditorProvider editor={editor}>
        <RichTextField controls={<EditorMenuControls />} />
      </RichTextEditorProvider>
    </React.Fragment>
  );
}
