import { takeLatest, put, call, all } from "redux-saga/effects";

import { INFRASTRUCTURE_ACTION_TYPES } from "./infrastructure.types";

import {
  addInfrastructureDataSuccess,
  getInfrastructureSuccess,
  updateInfrastructureSuccess,
  addInfrastructureDataFailed,
  getInfrastructureFailed,
  updateInfrastructureFailed,
} from "./infrastructure.action";

import {
  addInfrastructureDataAsyncRequest,
  getInfrastructureDataAsyncRequest,
  updateInfrastructureDataAsyncRequest,
} from "../utils/requests/requests";

export function* getInfrastructureDataAsync() {
  try {
    const response = yield call(getInfrastructureDataAsyncRequest);
    console.log("response.data", response.data);
    yield put(getInfrastructureSuccess(response.data));
  } catch (error) {
    yield put(getInfrastructureFailed(error));
  }
}

export function* addInfrastructureDataAsync(action) {
  try {
    const response = yield call(
      addInfrastructureDataAsyncRequest,
      action.payload
    );
    console.log("response.data", response.data);
    yield put(addInfrastructureDataSuccess(response.data));
  } catch (error) {
    yield put(addInfrastructureDataFailed(error));
  }
}

export function* updateInfrastructureDataAsync(action) {
  try {
    const response = yield call(
      updateInfrastructureDataAsyncRequest,
      action.payload
    );
    console.log("response.data", response.data);
    yield put(updateInfrastructureSuccess(response.data));
  } catch (error) {
    yield put(updateInfrastructureFailed(error));
  }
}

export function* onAddInfrastructureDataStart() {
  yield takeLatest(
    INFRASTRUCTURE_ACTION_TYPES.ADD_INFRASTRUCTURE_DATA_START,
    addInfrastructureDataAsync
  );
}

export function* onGetInfrastructureDataStart() {
  yield takeLatest(
    INFRASTRUCTURE_ACTION_TYPES.GET_INFRASTRUCTURE_DATA_START,
    getInfrastructureDataAsync
  );
}

export function* onUpdateInfrastructureDataStart() {
  yield takeLatest(
    INFRASTRUCTURE_ACTION_TYPES.UPDATE_INFRASTRUCTURE_DATA_START,
    updateInfrastructureDataAsync
  );
}

export function* infrastructureDataSaga() {
  yield all([call(onAddInfrastructureDataStart), call(onGetInfrastructureDataStart), call(onUpdateInfrastructureDataStart)]);
}
