import React, { ReactElement, useState, useContext } from "react";
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

export default function Login(): ReactElement {
  const { AuthoState, setState } = useContext(AuthenContext);

  const [username, setUsername] = useState<string>("");
  const [passwd, setPasswd] = useState<string>("");
  const [statusIn, setStatusIn] = useState<boolean>(AuthoState);
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    username: "",
    passwd: "",
  });

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<boolean> {
    e.preventDefault();
    const data: LoginInfo = {
      username: username,
      passwd: hashPassword(passwd),
    };
    setLoginInfo(data);
    const out: boolean = await loginAction(data)
      .then((res: boolean) => {
        if (!res) {
          alert("Fail to login");
        }
        return res;
      })
      .catch((e) => {
        alert("error caught");
        return false;
      });

    setStatusIn(out);
    setTimeout(() => {}, 500);

    setState(out);
    setLocalStorage("loginState", out);
    return out;
  }

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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUsername(event.target.value);
              }}
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setPasswd(event.target.value);
              }}
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
    </ThemeProvider>
  );
}
