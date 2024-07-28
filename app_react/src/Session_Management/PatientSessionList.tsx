import React, { ReactElement, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "../Components/Title";
import Button from "@mui/material/Button";
import { SessionData, SessionListProps, deleteSession } from "./utils";
import { SessionUploadForm } from "./SessionUploadPrompt";
import { createListBlobs } from "../utils/Document_Upload/documentManager";
import { getLocalStorage } from "../utils/localStorageManager";
import SessionFileList from "./SessionFileList";
import MySnackbar from "../Components/SnackBar";
import TextField from "@mui/material/TextField";

export default function PatientSessionList({
  setRows,
  rows,
}: SessionListProps): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  const [sessionName, setSessionName] = useState<string>("");

  const [openFileList, setOpenFileList] = useState<boolean>(false);
  const [fileList, setFileList] = useState<string[]>([]);
  const [nonEmptyWarning, setNonEmptyWaring] = useState<boolean>(false);

  const [filteredRows, setFilteredRows] = useState<SessionData[]>(rows);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setFilteredRows(
      rows.filter((row) =>
        row.session_name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  }, [rows, searchQuery]);

  return (
    <React.Fragment>
      <Title>Session List</Title>
      <TextField
        label="Search sessions"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Document Management</TableCell>
              <TableCell>details</TableCell>
              <TableCell>delete session</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row, index) => (
              <TableRow key={index}>
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
                <TableCell>
                  <Button
                    onClick={async () => {
                      const canDelete: boolean = await createListBlobs(
                        getLocalStorage("PersonAIUsername", ""),
                        `/${row.patient_name}/${row.session_name}`,
                        row.session_name,
                      )
                        .then((res: string[]) => {
                          if (res.length !== 0) {
                            return false;
                          } else {
                            return true;
                          }
                        })
                        .catch((err) => {
                          throw new Error(
                            "Fail to load session file list." + err,
                          );
                        });

                      if (canDelete) {
                        await deleteSession(row.session_id)
                          .then((res: boolean) => {
                            if (res) {
                              console.log("successful delete");
                              const newRows: SessionData[] = rows.filter(
                                (data: SessionData) =>
                                  data.session_id !== row.session_id,
                              );
                              setRows(newRows);
                            } else {
                              console.log("fail to delete");
                            }
                          })
                          .catch((err: any) => {
                            console.log(err);
                          });
                      } else {
                        setNonEmptyWaring(true);
                      }
                    }}
                    color="warning"
                  >
                    delete session
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
      <MySnackbar
        open={nonEmptyWarning}
        setOpen={setNonEmptyWaring}
        message="Only empty session can be deleted"
      />
    </React.Fragment>
  );
}
