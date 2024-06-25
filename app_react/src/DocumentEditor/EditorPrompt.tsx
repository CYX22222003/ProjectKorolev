import Container from "@mui/material/Container";
import { CssBaseline, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { EditorPatientSelect, EditorSessionSelect } from "./EditorPromptHelp";
import { getPatientList, PatientData } from "../Patient_Management/utils";
import { SessionData } from "../Session_Management/utils";
import { getPatientSessionList } from "../Session_Management/utils";
import { EditorPromptProps } from "./util";

export default function EditorPrompt({
  patientNameRef,
  sessionNameRef,
}: EditorPromptProps) {
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></Box>
      <EditorPatientSelect
        patientList={patientList}
        setPatientID={setPatientID}
        patientNameRef={patientNameRef}
      />
      <EditorSessionSelect
        sessionList={sessionList}
        sessionNameRef={sessionNameRef}
      />
    </Container>
  );
}
