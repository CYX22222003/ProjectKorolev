import { getTest, postTest } from "../utils/APIInteractionManager";
import { BlobUploadCommonResponse } from "@azure/storage-blob";
import { displayToday } from "../utils/timeManagement";
import { uploadAction } from "../utils/Document_Upload/documentManager";
import React, { SetStateAction } from "react";
import { deleteSimple } from "../utils/APIInteractionManager";

export type SessionFileListFragProps = {
  setFileList: React.Dispatch<SetStateAction<string[]>>
  fileList: string[];
};

export type SessionUIProps = {
  patient_id: number;
  patient_name: string;
  rows: SessionData[];
  setRows: React.Dispatch<React.SetStateAction<SessionData[]>>;
};

export type SessionListProps = {
  setRows: React.Dispatch<SetStateAction<SessionData[]>>
  rows: SessionData[];
};

export type SessionData = {
  patient_id: number;
  session_id: number;
  session_name: string;
  patient_name: string;
  user_id: number;
};

export type SessionDataSent = {
  patient_id: number;
  session_name: string;
};

export async function createSession(data: SessionDataSent): Promise<Response> {
  const res: Response = await postTest(
    data,
    process.env.REACT_APP_CREATE_SESSION,
    process.env.REACT_APP_API_KEY,
  ).catch((err: any) => { throw new Error(err) });
  return res;
}

export async function getAllSessionList(): Promise<SessionData[]> {
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

export async function getPatientSessionList(
  patient_id: number,
): Promise<SessionData[]> {
  const address: string =
    (process.env.REACT_APP_SESSION_BASE as string) + `/${patient_id}/get`;

  const res: SessionData[] = await getTest(
    address,
    process.env.REACT_APP_API_KEY,
  )
    .then((res: Response) => {
      return res.json();
    })
    .then((data: any) => {
      return data["collections"];
    })
    .catch((err) => {
      console.error(err);
    });

  return res;
}

/**
 * Create container and Upload Initial documents to the patients OR
 * Upload file to existing container
 */

export function generateSessionName(
  patientName: string,
  date: string | undefined,
): string {
  return date ? `${patientName}_${date}` : `${patientName}_${displayToday()}`;
}

export async function uploadSessionDocument(
  file: Blob,
  fileName: string,
  username: string,
  patientName: string,
  date: string,
): Promise<BlobUploadCommonResponse> {
  const res: BlobUploadCommonResponse = await uploadAction(
    file,
    fileName,
    `${username}/${patientName}/${patientName}_${date}`,
  );
  return res;
}

export async function deleteSession(session_id: number): Promise<boolean> {
  const baseAddress: string = process.env.REACT_APP_SESSION_BASE ?? "";

  const address: string = `${baseAddress}/${session_id}/delete`

  return (await deleteSimple(address, process.env.REACT_APP_API_KEY)
    .then((res: Response) => {
      return res.status === 200
    }).catch((err: any) => {
      return false;
    }));
}