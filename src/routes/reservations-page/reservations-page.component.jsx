import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box } from "@mui/material";

import ReservationGenerationMethod from "../../components/reservation-generation-method/reservation-generation-method.component";
import ReservationTable from "../../components/reservation-table/reservation-table.component";
import PlusButton from "../../components/plus-button/plus-button.component";
import ReservationAddModal from "../../components/reservation-add-modal/reservation-add-modal.component";
import ReservationConfigureModal from "../../components/reservation-configure-modal/reservation-configure-modal.component";
import { UpdateButton as GenerateButton } from "../../components/update-button/update-button.component";

import { addReservationsStart } from "../../store/reservation/reservation.action";

import { selectReservations } from "../../store/reservation/reservation.selector";
import { useOpenClose } from "../../hooks/useModalToggle";

const ReservationsPage = () => {
  const [generationMethod, setGenerationMethod] = useState("manually");
  const [tableReservationInputValues , setTableReservationInputValues] = useState({});
  const reservations = useSelector(selectReservations);
  const dispatch = useDispatch();

  const {
    isOpen: isReservationAddModalOpen,
    open: openReservationAddModal,
    close: closeReservationAddModal,
  } = useOpenClose();

  const {
    isOpen: isReservationConfigureModalOpen,
    open: openReservationConfigureModal,
    close: closeReservationConfigureModal,
  } = useOpenClose();

  const onHandleGenerate = () => {
    console.log("update", tableReservationInputValues);
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
          } else if(prop === "carId") {
            updatedReservation.carId = reservationUpdate[prop];
          }
        }
        return updatedReservation;
      }
      return reservation;
    });

    dispatch(addReservationsStart(updatedReservations));
  }

  return (
    <Box sx={{ padding: "50px 25px" }}>
      <form style={{ display: "flex", marginBottom: "55px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ReservationGenerationMethod
            generationMethod={generationMethod}
            onChange={(e) => setGenerationMethod(e.target.value)}
          />
          {generationMethod === "manually" ? (
            <PlusButton name="Add" onClick={() => openReservationAddModal()} />
          ) : (
            <PlusButton name="Configure" onClick={() => openReservationConfigureModal()} />
          )}
        </Box>
      </form>
       <ReservationAddModal open={isReservationAddModalOpen} onClose={closeReservationAddModal} />  
       <ReservationConfigureModal open={isReservationConfigureModalOpen} onClose={closeReservationConfigureModal} />
      <ReservationTable reservations={reservations} setTableReservationInputValues={setTableReservationInputValues}>
            <GenerateButton name={generationMethod === "manually" ? "Generate" : "Update"} onHandleUpdate={onHandleGenerate} />
      </ReservationTable>
    </Box>
  );
};

export default ReservationsPage;
          