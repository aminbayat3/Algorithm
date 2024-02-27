import { all, call } from 'redux-saga/effects';

import { configurationSaga } from './configuration/configuration.saga';

export function* rootSaga() {
    yield all([call(configurationSaga)]);
}