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
import { TriggerAIAction } from "../GenAI_Management/utils";
import AIMessageDisplay from "../GenAI_Management/AIMessageDisplay";
import CircularProgress from "@mui/material/CircularProgress";
import { downLoadDocument } from "../utils/Document_Upload/util";
import { getLocalStorage } from "../utils/localStorageManager";

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
          <Button onClick={() => setOpen(false)} autoFocus>
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
  const [aiFilename, setAIFilename] = useState<string>("");
  const [aiQuestion, setAIQuestion] = useState<string>("");
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
                      onClick={async () => {
                        setStartCalling(true);
                        await TriggerAIAction({
                          dest: fileName,
                          type: "docx",
                          prompt: "Summarize the text below",
                        })
                          .then((res: string) => {
                            setDisplayAIMessage(true);
                            setAIQuestion("summarize the text below");
                            setAIFilename(fileName);
                            setAIResponse(res);
                          })
                          .catch((err: Error) => {
                            console.log(err);
                          });
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      {startCalling && !displayAIMessage && <CircularProgress />}
      {displayAIMessage && (
        <AIMessageDisplay
          fileName={aiFilename}
          question={aiQuestion}
          aiResponse={aiResponse}
        />
      )}
    </React.Fragment>
  );
}
