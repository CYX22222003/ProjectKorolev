import React, { useEffect, useState } from "react";
import { createListPatients } from "../utils/Document_Upload/util";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "../Components/Title";

export default function PatientNameList() {
  const [nameList, setNameList] = useState<string[]>([]);

  useEffect(() => {
    createListPatients().then((names: string[]) => {
      setNameList(names);
    });
  }, []);

  return (
    <React.Fragment>
      <Title>Patient List</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nameList.map((patient, index) => (
            <TableRow>
              <TableCell>{index}</TableCell>
              <TableCell>{patient}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
