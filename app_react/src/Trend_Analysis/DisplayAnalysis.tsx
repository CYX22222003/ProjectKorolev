import React, { ReactElement } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { downloadAIResponse } from "../GenAI_Management/utils";

type DisplayAnalysisProps = {
  display: string;
};

export default function DisplayAnalysis({
  display,
}: DisplayAnalysisProps): ReactElement {
  return (
    <React.Fragment>
      <Box component="form" noValidate sx={{ maxHeight: 500, minWidth: 300 }}>
        <TextField
          multiline
          value={display}
          variant="outlined"
          InputProps={{ readOnly: true }}
          sx={{
            maxHeight: 500,
            overflow: "auto",
            width: "100%",
            "& .MuiInputBase-root": {
              height: "100%",
            },
          }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
      <Button
        onClick={() => {
          navigator.clipboard.writeText(display);
        }}
        variant="contained"
        sx={{
          borderRadius: "8px",
          margin: "8px 0",
          width: "240px",
        }}
      >
        Copy to clipboard
      </Button>
      <br />
      <Button onClick={() => downloadAIResponse(display)}
        variant="contained"
        sx={{
          borderRadius: "8px",
          margin: "8px 0",
          width: "240px",
        }}>
        Download AI response
      </Button>
      </Box>
    </React.Fragment>
  );
}
