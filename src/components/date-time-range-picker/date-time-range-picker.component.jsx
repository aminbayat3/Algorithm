import TextField from "@mui/material/TextField";
import { MobileDateTimeRangePicker } from "@mui/x-date-pickers-pro/MobileDateTimeRangePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const DateTimeRangePicker = ({ value, handleChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDateTimeRangePicker
        startText="Start"
        endText="End"
        value={value}
        onChange={handleChange}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  );
};
