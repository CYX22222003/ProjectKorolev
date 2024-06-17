import Typography from "@mui/material/Typography";
import React from "react";
import { AIMessageDisplayProps } from "./utils";
import Container from "@mui/material/Container";

export default function AIMessageDisplay({
  aiResponse,
}: AIMessageDisplayProps) {
  return (
    <React.Fragment>
      <Container sx={{ maxHeight: 500 }}>
        <Typography variant="h6">response: </Typography>
        <Typography variant="body1">{aiResponse}</Typography> <br />
      </Container>
    </React.Fragment>
  );
}
