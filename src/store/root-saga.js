import { all, call } from 'redux-saga/effects';

import { infrastructureDataSaga } from './infrastructure/infrastructure.saga';

export function* rootSaga() {
    yield all([call(infrastructureDataSaga)]);
}