import React, { ReactElement, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { AIPromptFormProps } from "./utils";
import { TriggerAIAction } from "./utils";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export function ThemeAnalysis({
  fileName,
  type,
  setStartCalling,
  setDisplayAIMessage,
  setAIResponse,
}: AIPromptFormProps): ReactElement {
  const [prompt, setPrompt] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const message: string =
      `Theme: ${e.currentTarget.value}.` +
      "summarize parts of the text that are relevant to the provided theme.";
    setPrompt(message);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
  };

  return (
    <React.Fragment>
      <Typography component="h2" variant="h5">
        Thematic analysis
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              autoComplete="given-name"
              name="Theme"
              required
              id="Theme"
              label="Theme"
              autoFocus
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, ml: 2}}
          >
            Create
          </Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
