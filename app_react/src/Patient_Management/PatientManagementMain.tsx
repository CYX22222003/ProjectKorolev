import React, { ReactElement, useEffect, useState } from "react";
import PatientCreationForm from "./PatientCreationForm";
import PatientList from "./PatientList";
import Background from "../Components/Background";
import { PatientData } from "./utils";
import { createListPatients } from "../Document_Upload/util";

export default function PatinetManagementMain(): ReactElement {
  const [patients, setPatients] = useState<PatientData[]>([]);
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
