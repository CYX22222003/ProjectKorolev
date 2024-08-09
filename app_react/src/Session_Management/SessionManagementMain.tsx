import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Background from "../Components/Background";
import SessionCreationForm from "./SessionCreationForm";
import { SessionData } from "./utils";
import PatientSessionList from "./PatientSessionList";
import { getTest } from "../utils/APIInteractionManager";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function SessionManagementMain(): ReactElement {
  const { patient_id, patient_name } = useParams();
  const patientID: number = Number(patient_id);
  const patientName: string = patient_name as string;
  const [rows, setRows] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const address: string =
      (process.env.REACT_APP_SESSION_BASE as string) + `/${patientID}/get`;
    getTest(address, process.env.REACT_APP_API_KEY)
      .then((res: Response) => res.json())
      .then((data: any) => data["collections"])
      .then((out) => setRows(out))
      .catch((err: Error) => {
        throw new Error("Fail to load session lists");
      })
      .finally(() => setLoading(false));
  }, [patientID]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Background
      elements={[
        <SessionCreationForm
          patient_id={patientID}
          patient_name={patientName}
          rows={rows}
          setRows={setRows}
        />,
        <PatientSessionList rows={rows} setRows={setRows} />,
      ]}
      header="Session Management"
    />
  );
}
