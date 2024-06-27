import React, { ReactElement, useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Title from "../Components/Title";
import { PatientsListProps, deletePatient } from "./utils";
import { Button } from "@mui/material";
import { InitializationForm } from "./PatientUploadPrompt";
import { getLocalStorage } from "../utils/localStorageManager";
import { getTest } from "../utils/APIInteractionManager";
import { PatientData } from "./utils";
import MySnackbar from "../Components/SnackBar";

export default function PatientList({
  setRows,
  rows,
}: PatientsListProps): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [patientName, setPatientName] = useState<string>("");
  const [deleteError, setDeleteError] = useState<boolean>(false);

  return (
    <React.Fragment>
      <Title>New Patient List</Title>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>Name</TableCell>
              {/* <TableCell>Initialization</TableCell> */}
              <TableCell>Sessions Management</TableCell>
              <TableCell>Container name</TableCell>
              <TableCell>Delete patient</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.patient_id}</TableCell>
                <TableCell>{row.patient_name}</TableCell>
                {/* <TableCell>
                  <Button
                    onClick={() => {
                      setPatientName(row.patient_name);
                      setOpen(true);
                    }}
                  >
                    upload initial document
                  </Button>
                </TableCell> */}
                <TableCell>
                  <Link
                    href={`/sessions/${row.patient_id}/${row.patient_name}`}
                  >
                    sessions
                  </Link>{" "}
                </TableCell>
                <TableCell>{`${getLocalStorage("PersonAIUsername", "")}/${row.patient_name}`}</TableCell>
                <TableCell>
                  <Button
                    color="warning"
                    onClick={async () => {
                      const address: string =
                        (process.env.REACT_APP_SESSION_BASE as string) +
                        `/${row.patient_id}/get`;
                      const canDelete: boolean = await getTest(
                        address,
                        process.env.REACT_APP_API_KEY,
                      )
                        .then((res: Response) => res.json())
                        .then((data: any) => data["collections"])
                        .then((data: any[]) => data.length === 0)
                        .catch((err: Error) => {
                          throw new Error("Fail to load session lists" + err);
                        });

                      if (canDelete) {
                        await deletePatient(row.patient_id).then(
                          (res: boolean) => {
                            if (res) {
                              const newRows: PatientData[] = rows.filter(
                                (ele: PatientData) =>
                                  ele.patient_id !== row.patient_id,
                              );
                              setRows(newRows);
                            } else {
                              console.error("Deletion error");
                            }
                          },
                        );
                      } else {
                        setDeleteError(true);
                      }
                    }}
                  >
                    delete patient
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <InitializationForm
        open={open}
        setOpen={setOpen}
        text="Initial document upload"
        patientName={patientName}
        setPatientName={setPatientName}
      />
      {deleteError && (
        <MySnackbar
          open={deleteError}
          setOpen={setDeleteError}
          message="Fail to delete non-empty patient"
        />
      )}
    </React.Fragment>
  );
}
