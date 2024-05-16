import React from "react";
import { useState } from "react";

export default function Login() {
  const [address, setEmail] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const postmail = (obj_sent: any) => {
    console.log(obj_sent);
    fetch("http://127.0.0.1:5000/session", {
      mode: "no-cors",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj_sent),
    })
      .then((response: any) => {
        console.log(response);
        setResponse("successfully logged in");
      })
      .catch((err) => {
        setResponse("fail to login");
        console.log(err);
      });
  };
  return (
    <div>
      <br />
      <br />

      <div>
        <h3>Login page</h3>
        <br /> <br />
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            const obj_sent = { address: address };
            postmail(obj_sent);
          }}
        >
          <label className="form-label">address: </label>
          <br />
          <input
            className="form-control-sm"
            value={address}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />{" "}
          <br />
          <br />
          <button
            className="btn bg-secondary text-white"
            type="submit"
            name="Login"
          >
            Login
          </button>
        </form>
        <br />
        <label>{response}</label>
      </div>
      <br />
    </div>
  );
}
