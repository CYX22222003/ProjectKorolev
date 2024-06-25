import React, { ReactElement, SetStateAction, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "../Components/Title";
import { SessionFileListFragProps } from "./utils";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import AIMessageDisplay from "../GenAI_Management/AIMessageDisplay";
import CircularProgress from "@mui/material/CircularProgress";
import { downLoadDocument } from "../utils/Document_Upload/documentManager";
import { getLocalStorage } from "../utils/localStorageManager";
import { AIPromptForm } from "../GenAI_Management/AIPromptForm";
import { FileDeleteButton } from "./SessionFileDelete";

type SessionFileListProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  fileList: string[];
};

export default function SessionFileList({
  open,
  setOpen,
  fileList,
}: SessionFileListProps) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen
      >
        <DialogContent>
          <SessionFileListFrag fileList={fileList} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="info"
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function SessionFileListFrag({
  fileList,
}: SessionFileListFragProps): ReactElement {
  const [aiTargetFile, setAITargetFile] = useState<string>("");
  const [startPrompt, setStartPrompt] = useState<boolean>(false);
  const [aiResponse, setAIResponse] = useState<string>("");
  const [displayAIMessage, setDisplayAIMessage] = useState<boolean>(false);
  const [startCalling, setStartCalling] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Title>Session file List</Title>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>index</TableCell>
              <TableCell>file name</TableCell>
              <TableCell>view AI summary</TableCell>
              <TableCell>download</TableCell>
              <TableCell>delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileList.map((fileName: string, index: number) => {
              return (
                <TableRow>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{fileName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => {
                        setAITargetFile(fileName);
                        setStartPrompt(true);
                      }}
                    >
                      AI insights
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={async () => {
                        await downLoadDocument(
                          getLocalStorage("PersonAIUsername", ""),
                          fileName,
                        );
                      }}
                    >
                      Download
                    </Button>
                  </TableCell>
                  <TableCell>
                    <FileDeleteButton fileName={fileName}/>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {startPrompt && (
          <AIPromptForm
            fileName={aiTargetFile}
            type="docx"
            setStartCalling={setStartCalling}
            setDisplayAIMessage={setDisplayAIMessage}
            setAIResponse={setAIResponse}
          />
        )}{" "}
        <br />
        {startCalling && <CircularProgress />}
        {displayAIMessage && <AIMessageDisplay aiResponse={aiResponse} />}
      </TableContainer>
    </React.Fragment>
  );
}
