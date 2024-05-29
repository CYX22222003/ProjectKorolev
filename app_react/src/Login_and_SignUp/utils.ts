//This folder is to create utility functions for login and signup features
import { LoginInfo, SignUpForm } from "./constants";
import { postTest } from "../utils/APIInteractionManager";
import { SHA256 } from "crypto-js";

/**
 * Handle the login action by sending the users input to the backend for verification 
 * @param data the user input data in the LoginInfo form
 * 
*/
export async function loginAction(data : LoginInfo) 
    : Promise<boolean> {
    const res : Response = await postTest(data, 
        process.env.REACT_APP_LOGIN_URL, process.env.REACT_APP_API_KEY)
    return res.status === 200;
}

/**
 * Handle the sign up action by sending the user input to the backend
 * @param data the user input data in SignUpForm
 * 
*/
export async function signupAction(data : SignUpForm) 
    : Promise<boolean> {
    const res : Response = await postTest(data, 
        process.env.REACT_APP_CREATE_ACCOUNT_URL, process.env.REACT_APP_API_KEY);
    return res.status === 200;
}

/**
 * Handle the logout action by sending the users input to the backend for verification 
 * @param data the user input data in the LoginInfo form
 * 
*/
export async function logoutAction(data : LoginInfo) : Promise<boolean> {
    const res : Response = await postTest(data, 
        process.env.REACT_APP_LOGOUT_URL, process.env.REACT_APP_API_KEY
    );
    return res.status === 200;
}


/**
 * Use SHA256 to hash the password sent to the backend
 * @param password 
 * 
*/
export function hashPassword(password : string) : string {
    return SHA256(password).toString();
}