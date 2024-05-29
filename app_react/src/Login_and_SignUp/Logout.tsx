import { ReactElement } from "react";
import { LoginInfo } from "./constants";
import { logoutAction } from "./utils";

type LogoutProps = {
    loginInfo : LoginInfo
}


export default function Logout({loginInfo} : LogoutProps) : ReactElement {
    return ( <div>
    <button onClick={() => {
            logoutAction(loginInfo);
        }}>logout</button>
    </div>); 
}