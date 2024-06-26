import React, { SetStateAction } from "react"
import { SessionData } from "../Session_Management/utils"
import { PatientData } from "../Patient_Management/utils"
import { SxProps } from "@mui/material"

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
    filenameRef : React.MutableRefObject<string>
    patientNameRef : React.MutableRefObject<string>
    sessionNameRef : React.MutableRefObject<string>
}

export type EditorTemplateProps = {
    filenameRef : React.MutableRefObject<string>
    patientNameRef : React.MutableRefObject<string>
    sessionNameRef : React.MutableRefObject<string>
}


export type EditorTitleProps = {
    filenameRef : React.MutableRefObject<string>
}

export const BoxConfigProps = {
    marginTop: 1,
    display: "flex",
    alignItems: "center"
}