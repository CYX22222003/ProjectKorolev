import React, {ReactElement, useState} from 'react';
import { LoginInfo } from './constants';
import Logout  from "./Logout"

async function loginAction(data : LoginInfo, 
    address : string | undefined, apiKey: string | undefined) 
    : Promise<boolean> {
    if (address === undefined ) {
        throw new Error("address is undefined");
    }

    if (apiKey === undefined ) {
        throw new Error("apiKey is undefined");
    }
    const res : Response = await fetch(address, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        credentials: 'include',
        headers: {
            "Content-Type" : "application/json",
            "API-Key" : apiKey,
            "Accept-Encoding": "gzip, deflate, br",
            "Connection" : "keep-alive"
        },
        body: JSON.stringify(data)
    })
    return res.status === 200;
}



export default function Login() : ReactElement {
    const [username, setEmail] = useState<string>("");
    const [passwd, setPasswd] = useState<string>("");
    const [statusIn, setStatusIn] = useState<boolean>(false);
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({username : "", passwd : ""});

    async function handleLogin(e : React.FormEvent<HTMLFormElement>) : Promise<boolean> {
        e.preventDefault();
        const data : LoginInfo = {
            username : username,
            passwd: passwd
        }
        setLoginInfo(data);
        const out : boolean = await loginAction(data, process.env.REACT_APP_LOGIN_URL, process.env.REACT_APP_API_KEY);
        setStatusIn(true);
        return out;
    }

    return (<div>
        <form onSubmit={handleLogin}>
            <label>Username</label><input type="text" onChange={(
                e : React.FormEvent<HTMLInputElement>) => {setEmail(e.currentTarget.value);}}/> <br />
            <label>Password</label><input type="password" onChange={
                (e : React.FormEvent<HTMLInputElement>) => {setPasswd(e.currentTarget.value);}}/> <br />
            <button type="submit" >Submit</button>
            <br />
        </form>
        <br /> <h1>{statusIn && ("Login Successfully")}</h1>
        <br /> <Logout loginInfo={loginInfo} apiKey={process.env.REACT_APP_API_KEY} />
    </div>);
}