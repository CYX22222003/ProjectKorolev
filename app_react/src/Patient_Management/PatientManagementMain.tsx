import React, { ReactElement, useEffect, useState } from "react";
import PatientCreationForm from "./PatientCreationForm";
import PatientList from "./PatientList";
import Background from "../Components/Background";
import { PatientData, getPatientList } from "./utils";

export default function PatinetManagementMain(): ReactElement {
  const [patients, setPatients] = useState<PatientData[]>([]);

  useEffect(() => {
    getPatientList().then((patients: PatientData[]) => {
      setPatients(patients);
    });
  }, []);
  return (
    <Background
      elements={[
        <PatientCreationForm rows={patients} setRow={setPatients} />,
        <PatientList rows={patients} />,
      ]}
      header="Patient Management"
    />
  );
}
