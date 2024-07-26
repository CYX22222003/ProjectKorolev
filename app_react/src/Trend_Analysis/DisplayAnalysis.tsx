import React, { ReactElement } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

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
      <Button
        onClick={() => {
          navigator.clipboard.writeText(display);
        }}
      >
        Copy to clipboard
      </Button>
    </React.Fragment>
  );
}
