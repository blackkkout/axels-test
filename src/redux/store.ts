import { configureStore } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import { getOrders, ordersActions } from './ducks/orders';
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
  yield takeEvery(ordersActions.getData, getOrders);
}

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
