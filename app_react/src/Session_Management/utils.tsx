import { PatientDataSent } from "../Patient_Management/utils";
import { getTest, postTest } from "../utils/APIInteractionManager";
import { BlobUploadCommonResponse } from "@azure/storage-blob";
import { displayToday } from "../utils/timeManagement";
import { uploadAction } from "../utils/Document_Upload/util";
//import { createContext } from "react";

export type SessionUIProps = {
  patient_id : number
  patient_name : string
}

export type SessionData = {
  patient_id: number;
  session_id: number;
  session_name: string;
  user_id: number;
};

export type SessionDataSent = {
  patient_id: number;
  session_name: string;
};

export async function createSession(data: PatientDataSent): Promise<Response> {
  const res: Response = await postTest(
    data,
    process.env.REACT_APP_CREATE_SESSION,
    process.env.REACT_APP_API_KEY,
  );
  return res;
}

export async function getSessionList(): Promise<SessionData[]> {
  const res: SessionData[] = await getTest(
    process.env.REACT_APP_VIEW_ALL_SESSIONS,
    process.env.REACT_APP_API_KEY,
  )
    .then((res: Response) => {
      return res.json();
    })
    .then((out: any) => {
      return out["collections"];
    })
    .catch((err) => {
      console.error("Fail to retrive patient list");
    });

  return res;
}

/**
 * Create container and Upload Initial documents to the patients OR
 * Upload file to existing container
 */

export async function uploadSessionDocument(
  file: Blob,
  fileName: string,
  username: string,
  patientName: string,
): Promise<BlobUploadCommonResponse> {
  const res: BlobUploadCommonResponse = await uploadAction(
    file,
    fileName,
    `${username}/${patientName}/${patientName}_${displayToday()}`,
  );
  return res;
}
