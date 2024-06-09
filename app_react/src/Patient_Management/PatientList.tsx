import React, { ReactElement, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Components/Title";
import { PatientsListProps } from "./utils";
import { Button } from "@mui/material";
import { InitializationForm } from "./PatientUploadPrompt";
import { createListPatients } from "../utils/Document_Upload/util";
import { getLocalStorage } from "../utils/localStorageManager";

export default function PatientList({ rows }: PatientsListProps): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  return (
    <React.Fragment>
      <Title>New Patient List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Initialization</TableCell>
            <TableCell>Sessions Management</TableCell>
            <TableCell>Container name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell>{row.patient_id}</TableCell>
              <TableCell>{row.patient_name}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    setPatientName(row.patient_name);
                    setOpen(true);
                  }}
                >
                  upload initial document
                </Button>
              </TableCell>
              <TableCell>
                <Link href="/patients">sessions</Link>
              </TableCell>
              <TableCell>{`${getLocalStorage("PersonAIUsername", "")}/${row.patient_name}`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <InitializationForm
        open={open}
        setOpen={setOpen}
        text="Initial document upload"
        patientName={patientName}
        setPatientName={setPatientName}
      />
      <Button onClick={async () => console.log(await createListPatients())}>
        Show the full list
      </Button>
    </React.Fragment>
  );
}
