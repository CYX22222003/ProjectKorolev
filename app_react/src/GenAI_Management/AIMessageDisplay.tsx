import Typography from "@mui/material/Typography";
import React from "react";
import { AIMessageDisplayProps, downloadAIResponse } from "./utils";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

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
      <Button onClick={() => downloadAIResponse(aiResponse)}>
        Download AI response
      </Button>
    </React.Fragment>
  );
}
