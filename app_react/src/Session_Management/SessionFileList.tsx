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
import { Box, Typography } from "@mui/material";
import DocxView from "../DocumentPreview/DocumentPreview";
import { downloadForPreview } from "../DocumentPreview/previewUtils";
import mammoth from "mammoth";
import { ThemeAnalysis } from "../GenAI_Management/ThematicAnalysisForm";

type SessionFileListProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<boolean>>;
  setFileList: React.Dispatch<SetStateAction<string[]>>;
  fileList: string[];
};

export default function SessionFileList({
  open,
  setOpen,
  setFileList,
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
          <SessionFileListFrag setFileList={setFileList} fileList={fileList} />
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
  setFileList,
  fileList,
}: SessionFileListFragProps): ReactElement {
  const [aiTargetFile, setAITargetFile] = useState<string>("");
  const [startPrompt, setStartPrompt] = useState<boolean>(false);
  const [aiResponse, setAIResponse] = useState<string>("");
  const [displayAIMessage, setDisplayAIMessage] = useState<boolean>(false);
  const [startCalling, setStartCalling] = useState<boolean>(false);

  const [startPreview, setStartPreview] = useState<boolean>(false);
  const [previewblob, setPreviewBlob] = useState<string>("");
  const [previewType, setPreviewType] = useState<string>("");

  const [startThematicAnalysis, setStartTheme] = useState<boolean>(false);

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
              <TableCell>AI Thematic Analysis</TableCell>
              <TableCell>download</TableCell>
              <TableCell>delete</TableCell>
              <TableCell>preview document</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fileList.map((fileName: string, index: number) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{fileName}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => {
                        if (startPrompt) {
                          setStartPrompt(false);
                        } else {
                          setAITargetFile(fileName);
                          setStartPrompt(true);
                        }
                      }}
                    >
                      AI insights
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      onClick={() => {
                        if (startThematicAnalysis) {
                          setStartTheme(false);
                        } else {
                          setAITargetFile(fileName);
                          setStartTheme(true);
                        }
                      }}
                    >
                      Thematic Analysis
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
                    <FileDeleteButton
                      setFileList={setFileList}
                      fileList={fileList}
                      fileName={fileName}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={async () => {
                        var file: Blob = await downloadForPreview(
                          getLocalStorage("PersonAIUsername", ""),
                          fileName,
                        );
                        if (fileName.includes(".txt")) {
                          const content = await file.text();
                          file = new Blob([content], {
                            type: "text/html;charset=UTF-8",
                          });
                          setPreviewType("text/html");
                        } else {
                          const arrayBuff = await file.arrayBuffer();
                          await mammoth
                            .convertToHtml({ arrayBuffer: arrayBuff })
                            .then((result) => {
                              console.log(result.value);
                              const content = result.value
                                .replace(/[\u2018\u2019]/g, "'")
                                .replace(/[\u201C\u201D]/g, '"');
                              console.log(content);
                              file = new Blob([content], {
                                type: "text/html;chatset=UTF-8",
                              });
                            });

                          setPreviewType("text/html");
                        }

                        setPreviewBlob(window.URL.createObjectURL(file));
                        setStartPreview(true);
                      }}
                    >
                      Preview File
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ alignItems: "center" }}>
        <Typography mt={4} variant="h5">
          Selected File: {aiTargetFile}
        </Typography>
        <br />
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
        {startThematicAnalysis && (
          <ThemeAnalysis
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
      </Box>
      <DocxView
        fileuri={previewblob}
        open={startPreview}
        type={previewType}
        setOpen={setStartPreview}
      />
    </React.Fragment>
  );
}
