import React, { ReactElement, useState } from "react";
import Logout from "../Login_and_SignUp/Logout";
import { LoginInfo } from "../Login_and_SignUp/constants";
import { getTest } from "../utils/APIInteractionManager";
import { Button } from "@mui/material";
import { Warning } from "../Components/Warning";

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

  const [welcome_info, setWelcome] = useState<string>("");
  return (
    <div>
      <h1>Welcome !</h1>
      <Button
        onClick={() => {
          if (welcome_info !== "") {
            setOpen(true);
            setMessage(welcome_info);
          } else {
            getTest(addressWelcome, apiKey)
              .then((data: Response) => {
                console.log(data);
                return data.text();
              })
              .then((text: string) => {
                setWelcome(text);
                setOpen(true);
                setMessage(text);
              })
              .catch((err) => {
                console.log(err);
                setOpen(true);
                setMessage("Welcome information is not loaded");
              });
          }
        }}
        variant="outlined"
      >
        welcome test
      </Button>
      <p>Click to receive the welcome message</p>
      <br />
      {<Logout loginInfo={loginInfo} />}
      <br />
      <Warning open={open} setOpen={setOpen} text={message} />
    </div>
  );
}
