import React, { SetStateAction } from "react"
import { SessionData } from "../Session_Management/utils"
import { PatientData } from "../Patient_Management/utils"

export type EditorPatientPromptProps = {
    patientNameRef : React.MutableRefObject<string>
    patientList : PatientData[]
    setPatientID : React.Dispatch<SetStateAction<number>>
}

export type EditorSessionPromptProps = {
    sessionNameRef : React.MutableRefObject<string>
    sessionList : SessionData[]
}

export type EditorPromptProps = {
    patientNameRef : React.MutableRefObject<string>
    sessionNameRef : React.MutableRefObject<string>
}

export type EditorTemplateProps = {
    patientNameRef : React.MutableRefObject<string>
    sessionNameRef : React.MutableRefObject<string>
}


export function detectMutableRef(target : React.MutableRefObject<any>) 
    : boolean {
    return target.current !== null;
}