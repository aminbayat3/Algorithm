import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";
import Button from "@mui/material/Button";

import ReservationGenerationMethod from "../../components/reservation-generation-method/reservation-generation-method.component";
import ReservationTable from "../../components/reservation-table/reservation-table.component";
import PlusButton from "../../components/plus-button/plus-button.component";
import ReservationModal from "../../components/reservation-modal/reservation-modal.component";
import { UpdateButton as GenerateButton } from "../../components/update-button/update-button.component";

import { selectReservations } from "../../store/reservation/reservation.selector";
import { useOpenClose } from "../../hooks/useModalToggle";

import { CustomTextField } from "../infrastructure-page/infrastructure-page.styles";

const defaultInputValues = {
  numOfReservations: 1,
  generationMethod: "manually",
};

const ReservationsPage = () => {
  const [inputValues, setInputValues] = useState(defaultInputValues);
  const [tableReservationInputValues , setTableReservationInputValues] = useState({});
  const reservations = useSelector(selectReservations);
  const dispatch = useDispatch();

  const {
    isOpen: isReservationModalOpen,
    open: openReservationModal,
    close: closeReservationModal,
  } = useOpenClose();

  const { numOfReservations, generationMethod } = inputValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const onHandleClick = () => {
    openReservationModal();
  }

  const onHandleSumbit = (e) => {
    e.preventDefault();
  };

  const onHandleGenerate = () => {
      console.log("Updated Reservations", tableReservationInputValues);

    //later we need to move it to a function
    const updatedReservations = reservations.map((reservation) => {
      if (tableReservationInputValues[reservation.id]) {
        let reservationUpdate = tableReservationInputValues[reservation.id];
        // Create a copy of the car object to avoid mutating the original
        let updatedReservation = { ...reservation };
        for (let prop in reservationUpdate) {
          if (prop === "expi") {
            updatedReservation.expi = reservationUpdate[prop];
          } else if (prop === "expo") {
            updatedReservation.expo = reservationUpdate[prop];
          } else if (prop === "neededEnergy") {
            updatedReservation.neededEnergy = +reservationUpdate[prop];
          } else if (prop === "priority") {
            updatedReservation.priority = +reservationUpdate[prop];
          }
        }
        return updatedReservation;
      }
      return reservation;
    });

    console.log("updatedReservations", updatedReservations);
  }

  return (
    <Box sx={{ padding: "50px 25px" }}>
      <form
        style={{ display: "flex", marginBottom: "55px" }}
        onSubmit={onHandleSumbit}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReservationGenerationMethod
            generationMethod={generationMethod}
            onChange={handleChange}
          />
          {generationMethod === "manually" ? (
            <PlusButton onClick={onHandleClick} />
          ) : (
            <>
            <CustomTextField
              value={numOfReservations}
              name="numOfReservations"
              onChange={handleChange}
              id="standard-basic"
              label="Number of Reservation"
              type="number"
              variant="standard"
            />
            <Button
            sx={{ width: "70px", height: "45px", marginLeft: "35px" }}
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
            </>
          )}
        </Box>
      </form>
       <ReservationModal open={isReservationModalOpen} onClose={closeReservationModal} />  
      <ReservationTable reservations={reservations} setTableReservationInputValues={setTableReservationInputValues}>
            <GenerateButton name="Generate" onHandleUpdate={onHandleGenerate} />
      </ReservationTable>
    </Box>
  );
};

export default ReservationsPage;
