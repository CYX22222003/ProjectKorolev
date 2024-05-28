import { ReactElement } from "react";
import { LoginInfo } from "./constants";

async function postTest(data : any, 
    address : string | undefined, apiKey: string | undefined) 
    : Promise<any> {
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
    
    //console.log("status code: " + res.status)
    return res.text();
}

type LogoutProps = {
    loginInfo : LoginInfo,
    apiKey : string | undefined
}


export default function Logout({loginInfo, apiKey} : LogoutProps) : ReactElement {
    return ( <div>
    <button onClick={() => {
            postTest(loginInfo, process.env.REACT_APP_LOGOUT_URL, apiKey)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        }}>logout</button>
    </div>); 
}