import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { AIPromptFormProps } from "./utils";
import { TriggerAIAction } from "./utils";

export function AIPromptForm({
  fileName,
  type,
  setStartCalling,
  setDisplayAIMessage,
  setAIResponse,
}: AIPromptFormProps) {
  const [prompt, setPrompt] = useState<string>("");

  return (
    <React.Fragment>
      <Box
        component="form"
        noValidate
        onSubmit={async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          setStartCalling(true);
          await TriggerAIAction({
            dest: fileName,
            type: type,
            prompt: prompt,
          })
            .then((res: string) => {
              setDisplayAIMessage(true);
              setAIResponse(res);
            })
            .catch((err: Error) => {
              console.log(err);
            });
        }}
        sx={{ mt: 3 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="given-name"
              name="Prompt"
              required
              fullWidth
              id="Prompt"
              label="Prompt"
              autoFocus
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setPrompt(e.target.value);
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
          Ask Gemini AI
        </Button>
      </Box>
    </React.Fragment>
  );
}
