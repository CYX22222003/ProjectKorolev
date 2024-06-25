import React, { ReactElement, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "../Components/Title";
import Button from "@mui/material/Button";
import { SessionListProps } from "./utils";
import { SessionUploadForm } from "./SessionUploadPrompt";
import { createListBlobs } from "../utils/Document_Upload/documentManager";
import { getLocalStorage } from "../utils/localStorageManager";
import SessionFileList from "./SessionFileList";
import { FileDeleteButton } from "./SessionFileDelete";

export default function PatientSessionList({
  rows,
}: SessionListProps): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  const [sessionName, setSessionName] = useState<string>("");

  const [openFileList, setOpenFileList] = useState<boolean>(false);
  const [fileList, setFileList] = useState<string[]>([]);

  return (
    <React.Fragment>
      <Title>Session List</Title>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Document Management</TableCell>
              <TableCell>details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow>
                <TableCell>{row.session_id}</TableCell>
                <TableCell>{row.session_name}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      setSessionName(row.session_name);
                      setPatientName(row.patient_name);
                      setOpen(true);
                    }}
                  >
                    upload session document
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={async () => {
                      await createListBlobs(
                        getLocalStorage("PersonAIUsername", ""),
                        `/${row.patient_name}/${row.session_name}`,
                        row.session_name,
                      )
                        .then((res: string[]) => {
                          setFileList(res);
                          setOpenFileList(true);
                        })
                        .catch((err) => {
                          throw new Error("Fail to load session file list");
                        });
                    }}
                  >
                    view uploaded documents
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <SessionUploadForm
        open={open}
        setOpen={setOpen}
        patientName={patientName}
        setPatientName={setPatientName}
        sessionName={sessionName}
        setSessionName={setSessionName}
      />

      <SessionFileList
        open={openFileList}
        setOpen={setOpenFileList}
        setFileList={setFileList}
        fileList={fileList}
      />
    </React.Fragment>
  );
}
