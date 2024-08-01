import { configureStore } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { fetchOrders, ordersActions } from './ducks/orders';
import { ordersReducer } from './ducks/orders';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    orders: ordersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(middleware),
});

sagaMiddleware.run(rootSaga);

export function* rootSaga() {
  yield takeEvery(ordersActions.getData, fetchOrders);
}
