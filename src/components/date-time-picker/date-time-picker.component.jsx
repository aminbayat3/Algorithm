import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { Box } from "@mui/material";

export const DateTimePicker = ({ onHandleDateTimeChange, value, defaultValue, label, name, id, onHandleDateTimeAccept }) => {
  return (
    <Box
    id={id}
    sx={{ display: "flex", justifyContent: "center", margin: "0 20px" }}
  >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileTimePicker"]}>
          <DemoItem label={label}>
            <MobileDateTimePicker
              value={value && value}
              name={name}
              defaultValue={defaultValue}
              onAccept={onHandleDateTimeAccept}
              onChange={onHandleDateTimeChange}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
      </Box>
  );
};
