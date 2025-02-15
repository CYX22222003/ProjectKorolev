import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AIPromptFormProps, TriggerAIAction } from "./utils";
import { Typography } from "@mui/material";

export function AIPromptForm({
  fileName,
  type,
  setStartCalling,
  setDisplayAIMessage,
  setAIResponse,
}: AIPromptFormProps) {
  const [prompt, setPrompt] = useState<string>("");
  const handleChange = (e: SelectChangeEvent) => {
    setPrompt(e.target.value);
  };

  return (
    <React.Fragment>
      <Box
        component="form"
        noValidate
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setStartCalling(true);
          setAIResponse("");
          await TriggerAIAction({
            dest: fileName,
            type: type,
            prompt: prompt,
          })
            .then((res: string) => {
              setDisplayAIMessage(true);
              setAIResponse(res);
              setStartCalling(false);
            })
            .catch((err: Error) => {
              setAIResponse("Fail to generate AI response");
              setDisplayAIMessage(true);
              setStartCalling(false);
              console.log(err);
            });
        }}
        sx={{ mt: 3 }}
      >
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
                <MenuItem value={"Summarize the content of the session"}>
                  Summarize the content of the session
                </MenuItem>
                <MenuItem value={"Generate sentimental analysis of patients"}>
                  Sentimental Analysis of patients' conditions
                </MenuItem>
                <MenuItem value={"Suggest new modes of therapy"}>
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
      </Box>
    </React.Fragment>
  );
}
