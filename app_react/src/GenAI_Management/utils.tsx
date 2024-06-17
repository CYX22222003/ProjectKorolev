import React from "react";
import { postTest } from "../utils/APIInteractionManager";

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
