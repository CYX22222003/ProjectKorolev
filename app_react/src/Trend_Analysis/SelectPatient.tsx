import React, {
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getPatientList, PatientData } from "../Patient_Management/utils";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { MenuItem } from "@mui/material";

type SelectPatientProps = {
  setPatientID: React.Dispatch<SetStateAction<number>>;
};

export default function SelectPatient({
  setPatientID,
}: SelectPatientProps): ReactElement {
  const [patientList, setPatientList] = useState<PatientData[]>([]);

  useEffect(() => {
    getPatientList()
      .then((data: PatientData[]) => setPatientList(data))
      .catch((err) => {
        throw new Error(err);
      });
  }, []);

  return (
    <React.Fragment>
      <FormControl sx={{ m: 1, minWidth: 500 }}>
        <InputLabel id="demo-simple-select-autowidth-label1">
          Select Patient
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label1"
          id="demo-simple-select-autowidth1"
          autoWidth
          label="Select Patient"
        >
          {patientList?.map((pt: PatientData, index: number) => {
            return (
              <MenuItem
                key={index}
                value={pt.patient_name}
                onClick={() => {
                  setPatientID(pt.patient_id);
                }}
              >
                {pt.patient_name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
