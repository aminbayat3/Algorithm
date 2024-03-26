import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from '@mui/x-date-pickers';

const SimulationStartTime = ({ setInputValues, startTime}) => {

  const onHandleChange = (value) => {
    setInputValues((prevValue) => ({...prevValue, startTime: value}));
  }

  return (
    <div className="plug-in-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileTimePicker"]}>
          <DemoItem label="Start Time">
            <MobileDateTimePicker value={startTime} onChange={onHandleChange} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default SimulationStartTime;
