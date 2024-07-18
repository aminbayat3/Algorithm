import { convertReservationDatesToDayjs } from "../utils/reducer/reducer.utils";

import { RESERVATION_ACTION_TYPES } from "./reservation.types";

const RESERVATION_INITIAL_STATE = {
  reservations: [],
  error: null,
};

export const ReservationReducer = (
  state = RESERVATION_INITIAL_STATE,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case RESERVATION_ACTION_TYPES.ADD_RESERVATION:
      return {
        ...state,
        reservations: [...state.reservations, payload],
      };
    case RESERVATION_ACTION_TYPES.GET_RESERVATIONS_SUCCESS:
      return {
        ...state,
        reservations: convertReservationDatesToDayjs(payload),
      };
    case RESERVATION_ACTION_TYPES.ADD_RESERVATIONS_SUCCESS:
      return {
        ...state,
        reservations: convertReservationDatesToDayjs(payload),
      };

    case RESERVATION_ACTION_TYPES.DELETE_RESERVATION_SUCCESS:
      return {
        ...state,
        reservations: convertReservationDatesToDayjs(payload),
      };

    case RESERVATION_ACTION_TYPES.GET_RESERVATIONS_FAILED:
    case RESERVATION_ACTION_TYPES.ADD_RESERVATIONS_FAILED:
    case RESERVATION_ACTION_TYPES.DELETE_RESERVATION_FAILED:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};
