import dayjs from "dayjs";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

import { getRandomDateBetween, generateRandomInteger } from "../../utils/utils";

import { addReservationsStart } from "../../store/reservation/reservation.action";

import { selectNumOfCars, selectstartTime } from "../../store/infrastructure/infrastructure.selector";

import { CustomDateTimeRangePicker as ExpiDateTimeRangePicker } from "../../components/date-time-range-picker/date-time-range-picker.component";
import { CustomDateTimeRangePicker as ExpoDateTimeRangePicker } from "../../components/date-time-range-picker/date-time-range-picker.component";


const ReservationConfigureModal = ({ onClose, open }) => {
  const [numOfReservations, setNumOfReservations] = useState(0);
  const startTime = useSelector(selectstartTime);
  const [expiRange, setExpiRange] = useState([dayjs(startTime).add(5, "hour"), dayjs(startTime).add(12, "hour")]);
  const [expoRange, setExpoRange] = useState([dayjs(startTime).add(1, "day"), dayjs(startTime).add(1, "day").add(8, "hour")]);
  const numOfCars = useSelector(selectNumOfCars);
  const dipatch = useDispatch();

    //later we can handle the change for both of these inputs in one handler
    const handleExpiDateTimeChange = (value) => {
        setExpiRange(value)
      };
    
      const handleExpoDateTimeChange = (value) => {
        setExpoRange(value)
      }

  const handleConfigureReservation = () => {
    let randomReservaions = [];

    for(let i = 0; i < numOfReservations; i++) {
        const randomReservation = {
            id: `RS${i+1}`,
            carId: `Car${generateRandomInteger(1, numOfCars)}`,
            expi: getRandomDateBetween(expiRange[0], expiRange[1]),
            expo: getRandomDateBetween(expoRange[0], expoRange[1]),
            neededEnergy: generateRandomInteger(20, 80),
            priority: generateRandomInteger(0, 1),
        }  

        randomReservaions.push(randomReservation);
    }

    dipatch(addReservationsStart(randomReservaions));
    onClose();
  };

  return (
    <>
      <Dialog
        maxWidth={"lg"}
        open={open}
        onClose={onClose}
        PaperProps={{ style: { width: "40%" } }}
      >
        <DialogTitle>Configure Random Reservations</DialogTitle>
        <DialogContent sx={{overflowX: 'hidden'}}>
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
              <TextField
                value={numOfReservations}
                name="numOfReservations"
                onChange={(e) => setNumOfReservations(e.target.value)}
                id="standard-basic"
                sx={{m: "10px 0 10px 20px", maxWidth: "330px"}}
                label="Number of Reservation"
                type="number"
                variant="standard"
              />
              <ExpiDateTimeRangePicker
                onHandleDateTimeChange={handleExpiDateTimeChange}
                label="expiRange"
                value={expiRange}
              />
              <ExpoDateTimeRangePicker
                onHandleDateTimeChange={handleExpoDateTimeChange}
                label="expoRange"
                value={expoRange}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleConfigureReservation}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReservationConfigureModal;
