
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";



export default function BasicDateTimePicker({ name, value, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        ampm={false}
        format={"DD.MM.YY HH:mm"}
        value={value ? dayjs(value, "DD.MM.YY HH:mm") : null}
        onChange={(newDateValue) => {
          if (!newDateValue?.isValid()) return;
          const formatted = newDateValue.format("DD.MM.YY HH:mm");
          onChange(name, formatted);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
          <div ref={InputProps?.ref}>
            <input ref={inputRef} {...inputProps} readOnly />
          </div>
        )}
      />
    </LocalizationProvider>
  );
}
