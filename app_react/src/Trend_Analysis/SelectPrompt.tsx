import React, { ReactElement, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { triggerMultipleAnalysis } from "./utils";
import CircularProgress from "@mui/material/CircularProgress";
import MySnackbar from "../Components/SnackBar";

type SelectPromptProps = {
  patient_id: number;
  setDisplayMessage: React.Dispatch<SetStateAction<string>>;
};

export default function SelectPrompt({
  patient_id,
  setDisplayMessage,
}: SelectPromptProps): ReactElement {
  const [prompt, setPrompt] = useState<string>("");
  const [startProgress, setStartProgress] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<boolean>(false);

  const handleChange = (e: SelectChangeEvent) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisplayMessage("");
    setStartProgress(true);
    await triggerMultipleAnalysis(patient_id, prompt)
      .then((data: string) => setDisplayMessage(data))
      .catch((err: Error) => {
        throw new Error("Fail to load AI response");
      })
      .finally(() => {
        setStartProgress(false);
      });
  };

  return (
    <React.Fragment>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h2" variant="h5">
              General Analysis
            </Typography>
            <FormControl sx={{ m: 1, minWidth: 500 }}>
              <InputLabel id="demo-simple-select-autowidth-label">
                AI Prompt
              </InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={prompt}
                onChange={handleChange}
                autoWidth
                autoFocus
                label="AI Prompt"
              >
                <MenuItem value={"Summarize the content of the patient"}>
                  Summarize the content of the patient
                </MenuItem>
                <MenuItem
                  value={"Generate sentimental analysis of the patient"}
                >
                  Sentimental Analysis of patients' conditions
                </MenuItem>
                <MenuItem
                  value={
                    "Suggest new modes of therapy based on the input documents of patient"
                  }
                >
                  Suggest new modes of therapy
                </MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              color="info"
              sx={{ mt: 3, mb: 2 }}
              disabled={prompt === ""}
            >
              Ask Gemini AI
            </Button>
          </Grid>
        </Grid>
        {startProgress && <CircularProgress />}
        {errorState && (
          <MySnackbar
            message="Fail to load AI response"
            setOpen={setErrorState}
            open={errorState}
          />
        )}
      </Box>
    </React.Fragment>
  );
}
