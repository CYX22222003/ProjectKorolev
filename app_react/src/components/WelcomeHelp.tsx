import React, { ReactElement, useState } from "react";
import Logout from "../Login_and_SignUp/Logout";
import { LoginInfo } from "../Login_and_SignUp/constants";
import Upload from "../Document_Upload/Upload";
// this is only a test template for reference.
import { getTest, postTest } from "../utils/APIInteractionManager";

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


  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  const addressGet: string | undefined = process.env.REACT_APP_VIEW_ACCOUNT_URL;
  const addressWelcome: string | undefined = process.env.REACT_APP_WELCOME_URL;

  const [welcome_info, setWelcome] = useState<string>("");
  return (
    <div>
      <h1>Welcome !</h1>
      <button
        onClick={() => {
          getTest(addressWelcome, apiKey)
            .then((data: Response) => {
              console.log(data);
              return data.text();
            })
            .then((text: string) => setWelcome(text))
            .catch((err) => console.log(err));
        }}
      >
        welcome test
      </button>
      <p>{welcome_info}</p>
      <br />
      {<Logout loginInfo={loginInfo} />}
      <br />
    </div>
  );
}