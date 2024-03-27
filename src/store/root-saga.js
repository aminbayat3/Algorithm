import { all, call } from 'redux-saga/effects';

import { infrastructureDataSaga } from './infrastructure/infrastructure.saga';
import { reservationSaga } from './reservation/reservation.saga';

export function* rootSaga() {
    yield all([call(infrastructureDataSaga), call(reservationSaga)]);
}