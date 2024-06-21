import Typography from "@mui/material/Typography";
import React from "react";
import { AIMessageDisplayProps } from "./utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

export default function AIMessageDisplay({
  aiResponse,
}: AIMessageDisplayProps) {
  return (
    <React.Fragment>
      <Box component="form" noValidate sx={{ maxHeight: 500, minWidth: 300 }}>
        <Paper elevation={1}>
        <Typography variant="body1">{aiResponse}</Typography> <br />
        </Paper>
      </Box>
    </React.Fragment>
  );
}
