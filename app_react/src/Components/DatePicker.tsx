import * as React from "react";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { displayToday } from "../utils/timeManagement";

//modified from sample elements in https://mui.com/x/react-date-pickers/

type DatePickerProps = {
  setVal: React.Dispatch<React.SetStateAction<string>>;
};

export default function MyDatePicker({ setVal }: DatePickerProps) {
  const [value, setValue] = useState<Dayjs | null>(dayjs(displayToday()));

  return (
    <React.Fragment>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker
            label="Choose the date of the session"
            value={value}
            onChange={(newValue: Dayjs | null) => {
              setValue(newValue);
              setVal(value ? value.format("DD[-]MM[-]YYYY") : "");
            }}
            views={["day", "month", "year"]}
          />
        </DemoContainer>
      </LocalizationProvider>
    </React.Fragment>
  );
}
