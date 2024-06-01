import { ReactElement, useContext } from "react";
import { LoginInfo } from "./constants";
import { logoutAction } from "./utils";
import { AuthenContext } from "../App";
import { setLocalStorage } from "../utils/localStorageManager";
import { Button } from "@mui/material";
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
          setState(false);
          setLocalStorage("loginState", AuthoState);
        }}
      >
        logout
      </Button>
    </div>
  );
}
