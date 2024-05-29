//This folder is to create utility functions for login and signup features
import { LoginInfo, SignUpForm } from "./constants";

export async function loginAction(data : LoginInfo) 
    : Promise<boolean> {
    const res : Response = await postTest(data, 
        process.env.REACT_APP_LOGIN_URL, process.env.REACT_APP_API_KEY)
    return res.status === 200;
}

export async function signupAction(data : SignUpForm) 
    : Promise<boolean> {
    const res : Response = await postTest(data, 
        process.env.REACT_APP_CREATE_ACCOUNT_URL, process.env.REACT_APP_API_KEY);
    return res.status === 200;
}

export async function logoutAction(data : LoginInfo) : Promise<boolean> {
    const res : Response = await postTest(data, 
        process.env.REACT_APP_LOGOUT_URL, process.env.REACT_APP_API_KEY
    );
    return res.status === 200;
}

async function postTest(data : LoginInfo | SignUpForm, 
    address : string | undefined, apiKey: string | undefined) 
    : Promise<Response> {
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
    
    return res;
}