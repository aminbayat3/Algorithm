import { takeLatest, put, call, all } from "redux-saga/effects";

import { RESERVATION_ACTION_TYPES } from "./reservation.types";

import {
  addReservationsSuccess,
  addReservationsFailed,
  getReservationsSuccess,
  getReservationsFailed,
} from "./reservation.action";

import {
  addReservationsAsyncRequest,
  getReservationsAsyncRequest,
} from "../utils/requests/requests";

export function* getReservationsAsync() {
  try {
    const response = yield call(getReservationsAsyncRequest);
    console.log("response.data", response.data);
    yield put(getReservationsSuccess(response.data));
  } catch (error) {
    yield put(getReservationsFailed(error));
  }
}

export function* addReservationsAsync(action) {
  try {
    const response = yield call(addReservationsAsyncRequest, action.payload);
    console.log("response.data", response.data);
    yield put(addReservationsSuccess(response.data));
  } catch (error) {
    yield put(addReservationsFailed(error));
  }
}

export function* onGetReservationsStart() {
    yield takeLatest(
      RESERVATION_ACTION_TYPES.GET_RESERVATIONS_START,
      getReservationsAsync
    );
  }

export function* onAddReservationsStart() {
  yield takeLatest(
    RESERVATION_ACTION_TYPES.ADD_RESERVATIONS_START,
    addReservationsAsync
  );
}

export function* reservationSaga() {
  yield all([
    call(onAddReservationsStart),
    call(onGetReservationsStart),
  ]);
}
