//This folder is to create utility functions for login and signup features
import { LoginInfo, SignUpForm } from "./constants";
import { postTest, getTest } from "../utils/APIInteractionManager";
import { SHA256 } from "crypto-js";
import { createNewUserContainer } from "../utils/Document_Upload/util";

/**
 * Handle the login action by sending the users input to the backend for verification 
 * @param data the user input data in the LoginInfo form
 * 
*/
export async function loginAction(data : LoginInfo) 
    : Promise<boolean> {
    let statusCheck : boolean = false;
    const out : boolean = await postTest(data, 
        process.env.REACT_APP_LOGIN_URL, process.env.REACT_APP_API_KEY)
        .then((res : Response) => {
            statusCheck = res.status === 200;
            return res.text();
        }).then((message:string) => {
            return message === data.username + " logged in";
        }).catch(e => false);
    return statusCheck && out;
}

/**
 * Handle the sign up action by sending the user input to the backend
 * @param data the user input data in SignUpForm
 * 
*/
export async function signupAction(data : SignUpForm) 
    : Promise<boolean> {
    
    const out : boolean = await postTest(data, 
        process.env.REACT_APP_CREATE_ACCOUNT_URL, process.env.REACT_APP_API_KEY)
        .then((res : Response) => {return res.status === 200})
        .then(async (res : boolean) => {
            if(res) {
                await createNewUserContainer(data.username)
                    .catch(err => {
                        return false;
                    });
            }
            return res;
        })
        .catch(e => false);
    
    return out;
}

/**
 * Handle the logout action by sending the users input to the backend for verification 
 * @param data the user input data in the LoginInfo form
 * 
*/
export async function logoutAction(data : LoginInfo) : Promise<boolean> {
    const out : boolean = await postTest(data, 
        process.env.REACT_APP_LOGOUT_URL, process.env.REACT_APP_API_KEY
    ).then((res : Response) => res.status === 200)
    .catch((err) => false);
    
    return out;
}


/**
 * Use SHA256 to hash the password sent to the backend
 * @param password 
 * 
*/
export function hashPassword(password : string) : string {
    return SHA256(password).toString();
}

export async function welcomeTest() : Promise<boolean> {
    const out : boolean = await getTest(process.env.REACT_APP_WELCOME_URL, 
        process.env.REACT_APP_API_KEY)
        .then((res:Response) => {
            return res.status === 200
        }).catch((e) => false);
    
    return out;
}