import React, { ReactElement, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "../Components/Title";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { SessionListProps } from "./utils";
import { SessionUploadForm } from "./SessionUploadPrompt";

export default function PatientSessionList({
  rows,
}: SessionListProps): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  const [sessionName, setSessionName] = useState<string>("");

  return (
    <React.Fragment>
      <Title>New Patient List</Title>
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
                  <Link variant="body2">view uploaded documents</Link>
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
    </React.Fragment>
  );
}
