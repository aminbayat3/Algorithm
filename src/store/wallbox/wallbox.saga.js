import { takeLatest, put, call, all } from 'redux-saga/effects';

import { WALLBOX_ACTION_TYPES } from './wallbox.types';

import { addWallboxesSuccess, addWallboxesFailed } from './wallbox.action';

import { addWallboxesAsyncRequest } from '../utils/requests/requests';


export function* addWallboxesAsync(action) {
    try {
        const response =  yield call(addWallboxesAsyncRequest, action.payload);
        console.log('response.data', response.data);
        yield put(addWallboxesSuccess(response.data));
    } catch(error) {
        yield put(addWallboxesFailed(error));
    }
}

export function* onWallboxesAddStart() {
    yield takeLatest(WALLBOX_ACTION_TYPES.ADD_WALLBOXES_START, addWallboxesAsync);
}


export function* wallboxesSaga() {
    yield all([call(onWallboxesAddStart)]);
}