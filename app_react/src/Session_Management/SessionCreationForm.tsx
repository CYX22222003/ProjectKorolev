import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MyDatePicker from "../Components/DatePicker";

import {
  createSession,
  generateSessionName,
  getPatientSessionList,
  SessionUIProps,
  SessionData,
} from "./utils";
/**
 * session creation form
 *
 */
export default function SessionCreationForm({
  patient_id,
  patient_name,
  rows,
  setRows,
}: SessionUIProps) {
  const defaultTheme = createTheme();
  const [date, setDate] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createSession({
        patient_id: patient_id,
        session_name: generateSessionName(patient_name, date),
      }).then((res) => {
        console.log(res.status);
      });

      await getPatientSessionList(patient_id).then((res: SessionData[]) => {
        setRows(res);
      });
    } catch (err: any) {
      throw new Error("fail to add patient");
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h2" variant="h5">
            Create New Session for {patient_name}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <MyDatePicker setVal={setDate} />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create session
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
