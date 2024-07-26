import React, { useState } from "react";
import Background from "../Components/Background";
import SelectPatient from "./SelectPatient";
import DisplayAnalysis from "./DisplayAnalysis";
import SelectPrompt from "./SelectPrompt";

export default function TrendAnalysis() {
  const [patientID, setPatientID] = useState<number>(-1);
  const [displayMessage, setDisplayMessage] = useState<string>("");

  return (
    <React.Fragment>
      <Background
        elements={[
          <SelectPatient setPatientID={setPatientID} />,
          <SelectPrompt
            patient_id={patientID}
            setDisplayMessage={setDisplayMessage}
          />,
          <DisplayAnalysis display={displayMessage} />,
        ]}
        header="Multiple document analysis"
      />
    </React.Fragment>
  );
}
