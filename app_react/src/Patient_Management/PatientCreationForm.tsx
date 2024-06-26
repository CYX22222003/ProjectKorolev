import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { createPatient, PatientCreationFormProps } from "./utils";
import { getPatientList, PatientData } from "./utils";
/**
 * Patient creation form model
 *
 */
export default function PatientCreationForm({
  rows,
  setRow,
}: PatientCreationFormProps) {
  const defaultTheme = createTheme();
  const [patientName, setPatientName] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createPatient({ patient_name: patientName })
        .then((res: Response) => console.log(res.status))
        .catch((err: any) => {
          alert("Fail to create user due to: " + err);
        });
      await getPatientList().then((patients: PatientData[]) => {
        setRow(patients);
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
            Create New user
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="patient_name"
                  required
                  fullWidth
                  id="patient_name"
                  label="patient_name"
                  autoFocus
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPatientName(e.currentTarget.value);
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
