//This folder is to create utility functions for login and signup features
import { LoginInfo, SignUpForm } from "./constants";
import { postTest } from "../utils/APIInteractionManager";
import { SHA256 } from "crypto-js";

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

export function hashPassword(passwd : string) : string {
    return SHA256(passwd).toString();
}