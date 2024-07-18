import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import Box from "@mui/material/Box";

export const DateTimePicker = ({ onHandleDateTimeChange, value, defaultValue, label, name }) => {
  return (
    <Box sx={{display: "flex", justifyContent: "center", margin: "0 20px"}}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileTimePicker"]}>
          <DemoItem label={label}>
            <MobileDateTimePicker
              value={value && value}
              name={name}
              defaultValue={defaultValue}
              onChange={onHandleDateTimeChange}
            />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </Box>
  );
};
