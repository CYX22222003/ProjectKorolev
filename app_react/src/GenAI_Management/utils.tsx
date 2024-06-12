import { postTest } from "../utils/APIInteractionManager";

export type TriggerAIRequest = {
  dest: string;
  type: string;
  prompt: string;
};

export type AIMessageDisplayProps = {
  fileName: string;
  question: string;
  aiResponse: string;
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
