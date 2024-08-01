import { takeEvery } from 'redux-saga/effects';

import { fetchOrders, ordersActions } from './ducks/orders';

export function* rootSaga() {
  yield takeEvery(ordersActions.getData, fetchOrders);
}
