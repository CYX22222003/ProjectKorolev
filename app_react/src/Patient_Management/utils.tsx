export type PatientData = {
  patient_name: string;
  documentDirectory: string;
  contactNumber: string;
};

export type PatientsListProps = {
  rows: PatientData[];
};

export type PatientCreationFormProps = {
  rows: PatientData[];
  setRow: React.Dispatch<React.SetStateAction<PatientData[]>>;
};
