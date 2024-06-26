import React from "react";
import { postTest } from "../utils/APIInteractionManager";
import { downloadFileFromBrowser } from "../utils/Document_Upload/documentManager";

export type TriggerAIRequest = {
  dest: string;
  type: string;
  prompt: string;
};

export type AIMessageDisplayProps = {
  aiResponse: string;
};

export type AIPromptFormProps = {
  fileName: string;
  type: string;
  setStartCalling: React.Dispatch<React.SetStateAction<boolean>>;
  setDisplayAIMessage: React.Dispatch<React.SetStateAction<boolean>>;
  setAIResponse: React.Dispatch<React.SetStateAction<string>>;
};

export async function TriggerAIAction(data: TriggerAIRequest): Promise<string> {
  const out: string = await postTest(
    data,
    process.env.REACT_APP_AI_ACTION,
    process.env.REACT_APP_API_KEY,
  )
    .then((res: Response) => res.json())
    .then((data: any) => data["AIresponse"])
    .catch((err: Error) => {
      throw new Error("Fail to load AI response");
    });
  return out;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const downloadAIResponse = (response:string) => {
  const newFile : Blob = new Blob(
      [response], 
      {
        type : "application/msword"
      }
  );
  downloadFileFromBrowser(newFile)
}
