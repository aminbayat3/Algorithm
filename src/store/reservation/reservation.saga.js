import { takeLatest, put, call, all } from "redux-saga/effects";

import { RESERVATION_ACTION_TYPES } from "./reservation.types";

import {
  addReservationsSuccess,
  addReservationsFailed,
  getReservationsSuccess,
  getReservationsFailed,
  deleteReservationSuccess,
  deleteReservationFailed,
} from "./reservation.action";

import {
  addReservationsAsyncRequest,
  getReservationsAsyncRequest,
  deleteReservationAsyncRequest
} from "../utils/requests/requests";

export function* getReservationsAsync() {
  try {
    const response = yield call(getReservationsAsyncRequest);
    yield put(getReservationsSuccess(response.data));
  } catch (error) {
    yield put(getReservationsFailed(error));
  }
}

export function* addReservationsAsync(action) {
  try {
    console.log("sending", action.payload);
    const response = yield call(addReservationsAsyncRequest, action.payload);
    console.log("response.data", response.data);
    yield put(addReservationsSuccess(response.data));
  } catch (error) {
    yield put(addReservationsFailed(error));
  }
}

export function* deleteReservationAsync(action) {
  try {
    const response = yield call(deleteReservationAsyncRequest, action.payload);
    yield put(deleteReservationSuccess(response.data));
  } catch (error) {
    yield put(deleteReservationFailed(error));
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

export function* onDeleteReservationStart() {
  yield takeLatest(
    RESERVATION_ACTION_TYPES.DELETE_RESERVATION_START,
    deleteReservationAsync
  );
}

export function* reservationSaga() {
  yield all([
    call(onAddReservationsStart),
    call(onGetReservationsStart),
    call(onDeleteReservationStart),
  ]);
}
