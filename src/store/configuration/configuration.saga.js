import { takeLatest, put, call, all } from 'redux-saga/effects';

import { CONFIGURATION_ACTION_TYPES } from './configuration.types';

import { calculateCarsDataSuccess, calculateCarsDataFailed } from './configuration.action';

import { carsDataAsyncRequest } from '../utils/requests/ready-time-request.utils';


export function* getCarsDataAsync(action) {
    try {
        const response =  yield call(carsDataAsyncRequest, action.payload);
        console.log('response.data', response.data);
        yield put(calculateCarsDataSuccess(response.data));
    } catch(error) {
        yield put(calculateCarsDataFailed(error));
    }
}

export function* onGetReadyTimeStart() {
    yield takeLatest(CONFIGURATION_ACTION_TYPES.CALCULATE_CARS_DATA_START, getCarsDataAsync);
}


export function* configurationSaga() {
    yield all([call(onGetReadyTimeStart)]);
}