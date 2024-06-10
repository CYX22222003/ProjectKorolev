import React, { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import Background from "../Components/Background";
import SessionCreationForm from "./SessionCreationForm";
import { SessionData } from "./utils";
import PatientSessionList from "./PatientSessionList";

export default function SessionManagementMain(): ReactElement {
  const { patient_id, patient_name } = useParams();
  const patientID: number = Number(patient_id);
  const patientName: string = patient_name as string;
  const [rows, setRows] = useState<SessionData[]>([]);
  return (
    <Background
      elements={[
        <SessionCreationForm
          patient_id={patientID}
          patient_name={patientName}
          rows={rows}
          setRows={setRows}
        />,
        <PatientSessionList rows={rows} />,
      ]}
      header="Session Management"
    />
  );
}
