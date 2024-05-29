import React, { ReactElement } from "react";
import Logout from "./Login_and_SignUp/Logout";
import { LoginInfo } from "./Login_and_SignUp/constants";
// this is only a test template for reference.
//ANOTHER COMMENT LINE FOR NEW CHANGES

async function getTest(
  address: string | undefined,
  apiKey: string | undefined,
): Promise<string> {
  if (address === undefined) {
    throw new Error("address is undefined");
  }

  if (apiKey === undefined) {
    throw new Error("apiKey is undefined");
  }

  const res: Response = await fetch(address, {
    method: "GET",
    mode: "cors",
    redirect: "follow",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
  });

  return res.text();
}

async function postTest(
  data: any,
  address: string | undefined,
  apiKey: string | undefined,
): Promise<any> {
  if (address === undefined) {
    throw new Error("address is undefined");
  }

  if (apiKey === undefined) {
    throw new Error("apiKey is undefined");
  }

  const res: Response = await fetch(address, {
    method: "POST",
    mode: "cors",
    redirect: "follow",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "API-Key": apiKey,
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
    },
    body: JSON.stringify(data),
  });

  //console.log("status code: " + res.status)
  return res.text();
}

export default function APITest(): ReactElement {
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

  const addressPost: string | undefined =
    process.env.REACT_APP_CREATE_ACCOUNT_URL;
  const apiKey: string | undefined = process.env.REACT_APP_API_KEY;
  const addressGet: string | undefined = process.env.REACT_APP_VIEW_ACCOUNT_URL;
  const addressLogin: string | undefined = process.env.REACT_APP_LOGIN_URL;
  const addressWelcome: string | undefined = process.env.REACT_APP_WELCOME_URL;

  return (
    <div>
      <h1>API_test</h1>
      <button
        onClick={() => {
          getTest(addressGet, apiKey)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }}
      >
        get test
      </button>
      <br />
      <button
        onClick={() => {
          postTest(data, addressPost, apiKey)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }}
      >
        post test
      </button>
      <br />
      <button
        onClick={() => {
          postTest(loginInfo, addressLogin, apiKey)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        }}
      >
        login
      </button>
      <br />
      <button
        onClick={() => {
          getTest(addressWelcome, apiKey)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
        }}
      >
        welcome test
      </button>
      <br />
      {<Logout loginInfo={loginInfo} />}
    </div>
  );
}
