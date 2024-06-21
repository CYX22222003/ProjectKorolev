import { ReactElement, useContext } from "react";
import { LoginInfo } from "./constants";
import { logoutAction } from "./utils";
import { AuthenContext } from "../App";
import { setLocalStorage } from "../utils/localStorageManager";
import { Button } from "@mui/material";
import React from "react";

type LogoutProps = {
  loginInfo: LoginInfo;
};

export default function Logout({ loginInfo }: LogoutProps): ReactElement {
  const { AuthoState, setState } = useContext(AuthenContext);

  return (
    <div>
      <Button
        onClick={() => {
          logoutAction(loginInfo);
          setLocalStorage("PersonAIUsername", "");
          setState(false);
          setLocalStorage("loginState", AuthoState);
        }}
      >
        logout
      </Button>
    </div>
  );
}
