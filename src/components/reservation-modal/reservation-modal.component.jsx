import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { addReservation } from "../../store/reservation/reservation.action";

import { DateTimePicker as ExpiTime } from "../date-time-picker/date-time-picker.component";
import { DateTimePicker as ExpoTime } from "../date-time-picker/date-time-picker.component";

import { selectInfrastructureData } from "../../store/infrastructure/infrastructure.selector";
import { selectNumOfReservations } from "../../store/reservation/reservation.selector";

const defaultInputValues = {
  carId: "",
  expi: null,
  expo: null,
  need: 40,
  priority: 0,
};

const ReservationModal = ({ onClose, open }) => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const infrastructureData = useSelector(selectInfrastructureData);
  const numOfReservations = useSelector(selectNumOfReservations);
  const dipatch = useDispatch();

  const { carId, expi, expo, need, priority } = inputValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onHandleExpiChange = (value) => {
    setInputValues((prevValue) => ({ ...prevValue, expi: value }));
  };

  const onHandleExpoChange = (value) => {
    setInputValues((prevValue) => ({ ...prevValue, expo: value }));
  };

  const handleAddReservation = () => {
    const newReservation = {
        id: `RS${numOfReservations}`,
        carId: carId,
        expi: expi,
        expo: expo,
        neededEnergy: need,
        priority: priority,
    }

    dipatch(addReservation(newReservation));
    setInputValues(defaultInputValues);
    onClose();
  }

  return (
    <>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={onClose}
        PaperProps={{ style: { width: "30%" } }}
      >
        <DialogTitle>Add Reservations</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 120 }}>
              <InputLabel id="car-select-label">Car</InputLabel>
              <Select
                autoFocus
                value={carId}
                onChange={handleChange}
                label="Car"
                name="carId"
                labelId="car-select-label"
                inputProps={{ id: "car-select" }}
              >
                {infrastructureData.cars.map((car) => {
                  return (
                    <MenuItem key={car.id} value={car.id}>
                      {car.name}
                    </MenuItem>
                  );
                })}
              </Select>

              <ExpiTime
                onHandleDateTimeChange={onHandleExpiChange}
                label="ExpiTime"
                value={expi}
              />
              <ExpoTime
                onHandleDateTimeChange={onHandleExpoChange}
                label="ExpoTime"
                value={expo}
              />
              <TextField
                value={need}
                name="need"
                sx={{ margin: "15px 0 35px 0" }}
                onChange={handleChange}
                id="standard-basic"
                label="Need"
                type="number"
                variant="standard"
              />
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                name="priority"
                value={priority}
                label="Priority"
                onChange={handleChange}
              >
                <MenuItem value={0}>Low</MenuItem>
                <MenuItem value={1}>High</MenuItem>
              </Select>
              <InputLabel id="priority-select-label">Priority</InputLabel>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleAddReservation}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationModal;
