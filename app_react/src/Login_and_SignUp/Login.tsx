import React, { ReactElement, useState, useContext, useEffect  } from "react";
import { LoginInfo } from "./constants";
import { loginAction } from "./utils";
import { AuthenContext } from "../App";
import { setLocalStorage } from "../utils/localStorageManager";
import { hashPassword } from "./utils";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from '@mui/material/Snackbar';

export default function Login(): ReactElement {
  const { AuthoState, setState } = useContext(AuthenContext);

  const [username, setUsername] = useState<string>("");
  const [passwd, setPasswd] = useState<string>("");
  const [statusIn, setStatusIn] = useState<boolean>(AuthoState);

  const [formValid, setFormValid] = useState<boolean>(false);

  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    setFormValid(username.trim().length > 0 && passwd.trim().length > 0);
  }, [username, passwd] );

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = event.target.value;
    setPasswd(value);
  };

 const handleLogin = async ( 
    e: React.FormEvent<HTMLFormElement>
 ): Promise<void> => {
    e.preventDefault();
    const data: LoginInfo = {
      username: username,
      passwd: hashPassword(passwd),
    };

  try {
    const success = await loginAction(data);
    if (!success) {
      setOpenSnackbar(true);
      setSnackbarMessage("Failed to login");
    } else {
      setLocalStorage("PersonAIUsername", username);
    }
    setStatusIn(success);
    setState(success);
    setLocalStorage("loginState", success);
  } catch (error) {
    setOpenSnackbar(true);
    setSnackbarMessage("Error occurred during login");
  }
};

const handleCloseSnackbar = () => {
  setOpenSnackbar(false);
};

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleLogin}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={handleUsernameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handlePasswordChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formValid}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </ThemeProvider>
  );
}
