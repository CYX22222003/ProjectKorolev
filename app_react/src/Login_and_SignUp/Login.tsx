import React, { ReactElement, useState, useContext } from "react";
import { LoginInfo } from "./constants";
import Logout from "./Logout";
import { loginAction } from "./utils";
import { AuthenContext } from "../App";
import { setLocalStorage } from "../cacheManager/localStorageManager";
import { hashPassword } from "./utils";

export default function Login(): ReactElement {
  const { AuthoState, setState } = useContext(AuthenContext);

  const [username, setEmail] = useState<string>("");
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
    const out: boolean = await loginAction(data);
    setStatusIn(out);

    setTimeout(() => {}, 500);

    setState(out);
    setLocalStorage("loginState", out);

    return out;
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setEmail(e.currentTarget.value);
          }}
        />{" "}
        <br />
        <label>Password</label>
        <input
          type="password"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setPasswd(e.currentTarget.value);
          }}
        />{" "}
        <br />
        <button type="submit">Submit</button>
        <br />
      </form>
      <br /> <h1>{statusIn && "Login Successfully"}</h1>
    </div>
  );
}
