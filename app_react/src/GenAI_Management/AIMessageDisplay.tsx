import Typography from "@mui/material/Typography";
import React from "react";
import { AIMessageDisplayProps } from "./utils";
import Container from "@mui/material/Container";

export default function AIMessageDisplay({
  fileName,
  question,
  aiResponse,
}: AIMessageDisplayProps) {
  return (
    <React.Fragment>
      <Container sx={{ maxHeight: 500 }}>
        <Typography variant="h6">AI Summary</Typography> <br />
        <Typography variant="h6">source: </Typography>
        <Typography variant="caption">{fileName}</Typography> <br />
        <Typography variant="h6">question: </Typography>
        <Typography variant="body2">{question}</Typography> <br />
        <Typography variant="h6">response: </Typography>
        <Typography variant="body1">{aiResponse}</Typography> <br />
      </Container>
    </React.Fragment>
  );
}
