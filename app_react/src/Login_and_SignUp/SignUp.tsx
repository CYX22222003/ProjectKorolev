import React, { ReactElement } from "react";
import { useState } from "react";
import { SignUpForm } from "./constants";
import { signupAction } from "./utils";
import { hashPassword } from "./utils";

export default function SignUp(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPasswd] = useState<string>("");
  const [signupState, setSignupState] = useState<boolean>(false);

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

    const out: boolean = await signupAction(data);
    setSignupState(out);
  }

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setUsername(e.currentTarget.value);
          }}
        />{" "}
        <br />
        <label>Email</label>
        <input
          type="email"
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
        {signupState && <h2>successfully sign up</h2>}
      </form>
    </div>
  );
}
