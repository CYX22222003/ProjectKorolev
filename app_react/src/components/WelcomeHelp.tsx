import React, { ReactElement, useState } from "react";
import Logout from "../Login_and_SignUp/Logout";
import { LoginInfo } from "../Login_and_SignUp/constants";
import Upload from "../Document_Upload/Upload";
// this is only a test template for reference.
import { getTest, postTest } from "../utils/APIInteractionManager";
import { Button } from "@mui/material";

export default function WelcomeHelp(): ReactElement {
  const test_password: string | undefined =
    process.env.REACT_APP_LOGIN_TEST_PASSWORD;

  const data = {
    email: "Test1@test1.web",
    username: "cyx",
    password: test_password,
  };
  const loginInfo: LoginInfo = {
    username: "cyx",
    passwd: test_password,
  };


  const apiKey: string | undefined = process.env.REACT_APP_API_KEY
  const addressWelcome: string | undefined = process.env.REACT_APP_WELCOME_URL;

  const [welcome_info, setWelcome] = useState<string>("");
  return (
    <div>
      <h1>Welcome !</h1>
      <Button onClick={() => {
          getTest(addressWelcome, apiKey)
            .then((data: Response) => {
              console.log(data);
              return data.text();
            })
            .then((text: string) => {
              setWelcome(text);
              alert(text);
            })
            .catch((err) => {console.log(err);alert("Welcome information is not loaded")});
        }}
        variant="outlined"
      >
        welcome test
      </Button>
      <p>Click to receive the welcome message</p>
      <br />
      {<Logout loginInfo={loginInfo} />}
      <br />
    </div>
  );
}