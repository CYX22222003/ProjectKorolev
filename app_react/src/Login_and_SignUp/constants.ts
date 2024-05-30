import React from "react"

export type LoginInfo = {
    username : string,
    passwd : string | undefined,
}

export type SignUpForm = {
    username:string,
    email:string,
    password:string | undefined,
}

export type AuthoType = {
    AuthoState : boolean,
    setState : React.Dispatch<React.SetStateAction<boolean>>
}