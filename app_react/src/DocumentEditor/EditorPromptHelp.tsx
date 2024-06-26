import React, { ReactElement, useState } from "react";
import { SessionData } from "../Session_Management/utils";
import { PatientData } from "../Patient_Management/utils";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import {
  EditorPatientPromptProps,
  EditorSessionPromptProps,
  EditorTitleProps,
} from "./util";

export function EditorPatientSelect({
  patientNameRef,
  patientList,
  setPatientID,
}: EditorPatientPromptProps): ReactElement {
  return (
    <React.Fragment>
      <FormControl sx={{ m: 1, minWidth: 500 }}>
        <InputLabel id="demo-simple-select-autowidth-label1">
          Select Patient
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label1"
          id="demo-simple-select-autowidth1"
          onChange={(e: SelectChangeEvent) => {
            console.log(e.target.value);
          }}
          autoWidth
          label="Select Patient"
        >
          {patientList?.map((pt: PatientData) => {
            return (
              <MenuItem
                value={pt.patient_name}
                onClick={() => {
                  patientNameRef.current = pt.patient_name;
                  setPatientID(pt.patient_id);
                }}
              >
                {pt.patient_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}

export function EditorSessionSelect({
  sessionNameRef,
  sessionList,
}: EditorSessionPromptProps): ReactElement {
  return (
    <React.Fragment>
      <FormControl sx={{ m: 1, minWidth: 500 }}>
        <InputLabel id="demo-simple-select-autowidth-label2">
          Select Session
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label2"
          id="demo-simple-select-autowidth2"
          onChange={(e: SelectChangeEvent) => {
            sessionNameRef.current = e.target.value;
          }}
          autoWidth
          label="Select Session"
        >
          {sessionList?.map((pt: SessionData) => {
            return (
              <MenuItem value={pt.session_name}>{pt.session_name}</MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}

export function EditorTitleInput({
  filenameRef,
}: EditorTitleProps): ReactElement {
  return (
    <React.Fragment>
      <Box
        sx={{
          m: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minWidth: 500,
        }}
      >
        <Box component="form" noValidate sx={{ mt: 3, minWidth: 500 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-title"
                name="Filename"
                required
                fullWidth
                id="Filename"
                label="Filename"
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  filenameRef.current = e.target.value;
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
}
