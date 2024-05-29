import { ReactElement, useContext } from "react";
import { LoginInfo } from "./constants";
import { logoutAction } from "./utils";
import { AuthenContext } from "../App";
import { setLocalStorage } from "../cacheManager/localStorageManager";
import { hashPassword } from "./utils";

type LogoutProps = {
    loginInfo : LoginInfo
}


export default function Logout({loginInfo} : LogoutProps) : ReactElement {
    const {AuthoState, setState} = useContext(AuthenContext);
    
    return ( <div>
    <button onClick={() => {
            logoutAction(loginInfo);
            setState(false);
            setLocalStorage("loginState", false);
        }}>logout</button>
    </div>); 
}