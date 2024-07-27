import React, { ReactElement, useEffect } from "react";
import { useState } from "react";
import { postTest } from "../utils/APIInteractionManager";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { passwordValidator } from "../utils/formatValidator";
import { useNavigate } from "react-router-dom";

export default function UpdateProfile(): ReactElement {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [promptMessage, setPrompt] = useState<string>("");

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>(""); // Assuming this comes from fetching user data

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );

  const validateEmail = (value: string): boolean => {
    return value.includes("@");
  };

  async function handleUpdateProfile(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    if (newPassword || confirmPassword) {
      if (!passwordValidator(newPassword) || newPassword !== confirmPassword) {
        setSnackbarMessage("Passwords do not match.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    }

    const dataToUpdate = {
      email: newEmail,
      password: hashPassword(newPassword),
      oldPassword: hashPassword(oldPassword),
    };

    try {
      const response = await postTest(
        dataToUpdate,
        process.env.REACT_APP_UPDATE_URL,
        process.env.REACT_APP_API_KEY,
        "PUT",
      );

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      setSnackbarMessage("Profile updated successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setNewEmail(newEmail);
      setNewPassword(newPassword);
    } catch (error) {
      setSnackbarMessage("Failed to update profile.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }

  const handleEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setNewEmail(value);

    if (!validateEmail(value)) {
      setEmailError("Invalid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setNewPassword(value);

    if (!passwordValidator(value)) {
      setPasswordError(
        "Password must contain at least one special character and minimun length of 6 characters.",
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setConfirmPassword(value);
  };

  const handleOldPasswordChecking = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value = event.target.value;
    setOldPassword(value);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleGoBack = () => {
    navigate("/");
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
            Update Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleUpdateProfile}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="New Email Address"
                  name="newEmail"
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
                  name="newPassword"
                  label="New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!passwordError}
                  helperText={passwordError}
                  onChange={handlePasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleConfirmPasswordChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="oldPassword"
                  label="Confirm the change with the old password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleOldPasswordChecking}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update Profile
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGoBack}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </ThemeProvider>
  );
}
