import React, {ReactElement, useState} from 'react';
import { LoginInfo } from './constants';
import Logout  from "./Logout"
import { loginAction } from "./utils"

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
        const out : boolean = await loginAction(data);
        setStatusIn(out);
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
        <br /> <Logout loginInfo={loginInfo} />
    </div>);
}