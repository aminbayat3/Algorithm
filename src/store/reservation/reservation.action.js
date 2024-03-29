import { createAction } from "../utils/reducer/reducer.utils";
import { RESERVATION_ACTION_TYPES } from "./reservation.types";

export const addReservation = (reservation) => createAction(RESERVATION_ACTION_TYPES.ADD_RESERVATION, reservation);

export const getReservationsStart = () => createAction(RESERVATION_ACTION_TYPES.GET_RESERVATIONS_START);
export const getReservationsSuccess = (reservations) => createAction(RESERVATION_ACTION_TYPES.GET_RESERVATIONS_SUCCESS, reservations);
export const getReservationsFailed = (error) => createAction(RESERVATION_ACTION_TYPES.GET_RESERVATIONS_FAILED, error);

export const addReservationsStart = (reservations) => createAction(RESERVATION_ACTION_TYPES.ADD_RESERVATIONS_START, reservations);
export const addReservationsSuccess = (reservations) => createAction(RESERVATION_ACTION_TYPES.ADD_RESERVATIONS_SUCCESS, reservations);
export const addReservationsFailed = (error) => createAction(RESERVATION_ACTION_TYPES.ADD_RESERVATIONS_FAILED, error);