import React from "react";
import Container from "@mui/material/Container";
import { CssBaseline, Box } from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { EditorPatientSelect, EditorSessionSelect } from "./EditorPromptHelp";
import { getPatientList, PatientData } from "../Patient_Management/utils";
import { SessionData } from "../Session_Management/utils";
import { getPatientSessionList } from "../Session_Management/utils";
import { BoxConfigProps, EditorPromptProps } from "./util";

export default function EditorPrompt({
  filenameRef,
  patientNameRef,
  sessionNameRef,
}: EditorPromptProps): ReactElement {
  const [patientID, setPatientID] = useState<number>(0);

  const [patientList, setPatientList] = useState<PatientData[]>([]);
  const [sessionList, setSessionList] = useState<SessionData[]>([]);

  useEffect(() => {
    getPatientList()
      .then((list: PatientData[]) => setPatientList(list))
      .catch((err: Error) => alert("Fail to fetch session list"));
  }, []);

  useEffect(() => {
    try {
      getPatientSessionList(patientID).then((data: SessionData[]) => {
        setSessionList(data);
      });
    } catch (err: any) {
      console.log(err);
    }
  }, [patientID]);

  return (
    <>
      <Container component="main">
        <CssBaseline />
        <Box sx={BoxConfigProps}>
          <EditorPatientSelect
            patientList={patientList}
            setPatientID={setPatientID}
            patientNameRef={patientNameRef}
          />
        </Box>
        <Box sx={BoxConfigProps}>
          <EditorSessionSelect
            sessionList={sessionList}
            sessionNameRef={sessionNameRef}
          />
        </Box>
      </Container>
    </>
  );
}
