import React, { ReactElement } from "react";
import { useState } from "react";

type SignUpForm = {
    username:string,
    email:string,
    password:string,
}



async function signupAction(data : SignUpForm, 
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



export default function SignUp() : ReactElement {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPasswd] = useState<string>("");
    const [signupState, setSignupState] = useState<boolean>(false);
    
    async function handleSignUp(e : React.FormEvent<HTMLFormElement>) : Promise<void> {
        e.preventDefault();
        const data : SignUpForm = {
            username : username,
            email : email,
            password: password
        }

        const out : boolean = await signupAction(data, process.env.REACT_APP_CREATE_ACCOUNT_URL, process.env.REACT_APP_API_KEY);
        setSignupState(out);
    }


    return (<div>
        <form onSubmit={handleSignUp}>
            <label>Username</label><input type="text" onChange={(e : React.FormEvent<HTMLInputElement>) => {setUsername(e.currentTarget.value);}}/> <br />
            <label>Email</label><input type="email" onChange={(e : React.FormEvent<HTMLInputElement>) => {setEmail(e.currentTarget.value);}}/> <br />
            <label>Password</label><input type="password" onChange={(e : React.FormEvent<HTMLInputElement>) => {setPasswd(e.currentTarget.value);}}/> <br />
            <button type="submit" >Submit</button>
            <br />
            {signupState && (<h2>successfully sign up</h2>)}
        </form>
    </div>);
}