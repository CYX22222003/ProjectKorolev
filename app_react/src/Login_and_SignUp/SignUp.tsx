import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { SignUpForm } from "./constants";
import { signupAction } from "./utils";
import { hashPassword } from "./utils";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Warning } from "../Components/Warning";
import { usernameValidator } from "../utils/formatValidator";

export default function SignUp(): ReactElement {
  const defaultTheme = createTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [promptMessage, setPrompt] = useState<string>("");

  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPasswd] = useState<string>("");

  const [usernameError, setUsernameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [formValid, setFormValid] = useState<boolean>(false);

  const validateUsername = (value: string): boolean => {
    return usernameValidator(value);
  };

  const validateEmail = (value: string): boolean => {
    return value.includes("@");
  };

  const validatePassword = (value: string): boolean => {
    return value.length > 0;
  };

  useEffect(() => {
    const isUsernameValid = validateUsername(username);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setFormValid(
      isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        username.trim().length > 0 &&
        email.trim().length > 0 &&
        password.trim().length > 0,
    );
  }, [username, email, password]);

  async function handleSignUp(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();
    console.log(hashPassword(password));
    const data: SignUpForm = {
      username: username,
      email: email,
      password: hashPassword(password),
    };

    const out: boolean = await signupAction(data).catch((err) => {
      return false;
    });
    if (!out) {
      setPrompt("Sign up fails. Account already exists");
      setOpen(true);
    } else {
      setPrompt("New account is created");
      setOpen(true);
    }
  }

  const handleUsernameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setUsername(value);

    if (!usernameValidator(value)) {
      setUsernameError(
        "Username can only contain lowercase letters, numbers, and hyphens, and must start with a letter or number.",
      );
      setFormValid(false); // Disable form submission
    } else {
      setUsernameError("");
    }
  };

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Invalid email address.");
      setFormValid(false);
    } else {
      setEmailError("");
      //validateForm();
    }
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setPasswd(value);
    //validateForm();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSignUp}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="userame"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  autoFocus
                  error={!!usernameError}
                  helperText={usernameError}
                  onChange={handleUsernameChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!emailError}
                  helperText={emailError}
                  onChange={handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Warning open={open} setOpen={setOpen} text={promptMessage} />
    </ThemeProvider>
  );
}
