import React, { ReactElement, useEffect, useState } from "react";
import PatientCreationForm from "./PatientCreationForm";
import PatientList from "./PatientList";
import Background from "../Components/Background";
import { PatientData, getPatientList } from "./utils";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function PatinetManagementMain(): ReactElement {
  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPatientList().then((patients: PatientData[]) => {
      setPatients(patients);
    }).finally(() => setLoading(false));
  }, []);
  
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
        <PatientCreationForm rows={patients} setRow={setPatients} />,
        <PatientList setRows={setPatients} rows={patients} />,
      ]}
      header="Patient Management"
    />
  );
}
