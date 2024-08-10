import React, { ReactElement, useState } from "react";
import Logout from "../Login_and_SignUp/Logout";
import { LoginInfo } from "../Login_and_SignUp/constants";
import { Warning } from "../Components/Warning";
import { getLocalStorage } from "../utils/localStorageManager";
import { Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: 'Cursive, Arial, sans-serif', 
    h5: {
      fontFamily: 'Fantasy, serif',
    },
  },
});

export default function WelcomeHelp(): ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const test_password: string | undefined =
    process.env.REACT_APP_LOGIN_TEST_PASSWORD;

  const loginInfo: LoginInfo = {
    username: "cyx",
    passwd: test_password,
  };

  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  const addressWelcome: string | undefined = process.env.REACT_APP_WELCOME_URL;
  
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ p: 3 }}>
      <CssBaseline />
      <Typography variant="h5" 
      sx={{ fontWeight: 'bold', color: 'primary.light', fontSize: '2rem' }}>
        Hello {getLocalStorage("PersonAIUsername", "")}! Welcome to personAI
      </Typography>
      <br />
      {<Logout loginInfo={loginInfo} />}
      <br />
      <Warning open={open} setOpen={setOpen} text={message} />
      </Box>
    </ThemeProvider>
  );
}
