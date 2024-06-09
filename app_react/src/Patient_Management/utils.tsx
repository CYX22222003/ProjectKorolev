import { getTest, postTest } from "../utils/APIInteractionManager";

export type PatientData = {
  patient_id: number;
  patient_name: string;
};

export type PatientDataSent = {
  patient_name: string;
};

export type PatientsListProps = {
  rows: PatientData[];
};

export type PatientCreationFormProps = {
  rows: PatientData[];
  setRow: React.Dispatch<React.SetStateAction<PatientData[]>>;
};

export async function createPatient(data: PatientDataSent): Promise<Response> {
  const res: Response = await postTest(
    data,
    process.env.REACT_APP_CREATE_PATIENT,
    process.env.REACT_APP_API_KEY,
  );
  return res;
}

export async function getPatientList(): Promise<PatientData[]> {
  const res: PatientData[] = await getTest(
    process.env.REACT_APP_VIEW_ALL_PATIENTS,
    process.env.REACT_APP_API_KEY,
  )
    .then((res: Response) => {
      return res.json();
    })
    .then((out: any) => {
      return out["list"];
    })
    .catch((err) => {
      console.error("Fail to retrive patient list");
    });

  return res;
}
