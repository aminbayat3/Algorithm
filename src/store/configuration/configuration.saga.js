import { takeLatest, put, call, all } from 'redux-saga/effects';

import { CONFIGURATION_ACTION_TYPES } from './configuration.types';

import { calculateReadyTimesSuccess, calculateReadyTimesFailed } from './configuration.action';

import { readyTimeAsyncRequest } from '../utils/requests/ready-time-request.utils';


export function* getReadyTimeAsync(action) {
    try {
        const response =  yield call(readyTimeAsyncRequest, action.payload);
        console.log('response.data', response.data);
        yield put(calculateReadyTimesSuccess(response.data));
    } catch(error) {
        yield put(calculateReadyTimesFailed(error));
    }
}

export function* onGetReadyTimeStart() {
    yield takeLatest(CONFIGURATION_ACTION_TYPES.CALCULATE_READY_TIME_START, getReadyTimeAsync);
}


export function* configurationSaga() {
    yield all([call(onGetReadyTimeStart)]);
}