import { createSelector } from "reselect";

export const selectReservationReducer = (state) => state.reservation;

export const selectReservations = createSelector(
    [selectReservationReducer],
    (reservation) => reservation.reservations
);
