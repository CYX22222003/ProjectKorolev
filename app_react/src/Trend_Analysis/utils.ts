import { postTest } from "../utils/APIInteractionManager";

export async function triggerMultipleAnalysis(patientID : number, prompt : string) {
    const out : string = await postTest(
        {
            patient_id : patientID,
            prompt : prompt + " Return everything in plain text. Don't return in markdown format"
        },
        process.env.REACT_APP_MULTIPLE_DOCUMENT,
        process.env.REACT_APP_API_KEY
    )
    .then((res : Response) => res.json())
    .then(data => data["AIResponse"])
    .catch((err : Error) => {
        throw new Error("Fail to load AI response");
    });

    return out;
}