import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputDateTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputDateTimeRangeField';

export const CustomDateTimeRangePicker = ({ onHandleDateTimeChange, value, label }) => {

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={['SingleInputDateTimeRangeField']}
        sx={{m: "15px 0 15px 20px"}}
      >
        <SingleInputDateTimeRangeField
          label={label}
          value={value}
          onChange={onHandleDateTimeChange}
          sx={{
            '& .MuiInputBase-root': {
              maxWidth: "335px",
            },
            '& .MuiInputBase-input': {
              fontSize: '0.875rem', // Set the font size smaller
              padding: '10px 0 10px 10px', // Adjust padding to make the overall input smaller
            },
            '& .MuiInputLabel-root': {
              fontSize: '0.875rem', // Optionally, make the label text smaller to
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}