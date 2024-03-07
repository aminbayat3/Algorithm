import { useDispatch, useSelector } from 'react-redux';
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import { setStartTime } from '../store/configuration/configuration.action';
import { selectStartTime } from '../store/configuration/configuration.selector';

const PlugInDatePicker = () => {
  const dispatch = useDispatch();
  const startTime = useSelector(selectStartTime);


  const onHandleChange = (value) => {
    dispatch(setStartTime(value));
  }

  return (
    <div className="plug-in-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileTimePicker"]}>
          <DemoItem label="Plug in">
            <MobileDateTimePicker value={startTime} onChange={onHandleChange} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default PlugInDatePicker;
