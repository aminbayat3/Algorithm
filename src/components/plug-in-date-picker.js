import { useDispatch, useSelector } from 'react-redux';
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDateTimePicker } from '@mui/x-date-pickers';

import { setPlugIn } from '../store/configuration/configuration.action';
import { selectPlugInTime } from '../store/configuration/configuration.selector';

const PlugInDatePicker = () => {
  const dispatch = useDispatch();
  const plugInTime = useSelector(selectPlugInTime);


  const onHandleChange = (value) => {
    dispatch(setPlugIn(value));
  }

  return (
    <div className="plug-in-container">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["MobileTimePicker"]}>
          <DemoItem label="Plug in">
            <MobileDateTimePicker value={plugInTime} onChange={onHandleChange} defaultValue={plugInTime} />
          </DemoItem>
        </DemoContainer>
      </LocalizationProvider>
    </div>
  );
};

export default PlugInDatePicker;
