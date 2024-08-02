import { createAction, PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';

import { fetchOrders } from '../../api/orders';
import { Order } from '../../types/order';
import { RootState } from '../store';

const _status = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const;

type Status = (typeof _status)[keyof typeof _status];

interface OrdersState {
  data: Order[];
  status: Status;
}

const initialState: OrdersState = {
  data: [],
  status: _status.idle,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<Status>) {
      state.status = action.payload;
    },
    setData(state, action: PayloadAction<Order[]>) {
      state.data = action.payload;
    },
  },
});

export const ordersActions = {
  getData: createAction(`${ordersSlice.name}/getData`),
  setStatus: ordersSlice.actions.setStatus,
  setData: ordersSlice.actions.setData,
};
export const ordersReducer = ordersSlice.reducer;

export function* getOrders(): Generator<any, void, any> {
  try {
    yield put(ordersActions.setStatus(_status.loading));
    const data: { orders: Order[] } = yield fetchOrders();
    yield put(ordersActions.setStatus(_status.success));
    yield put(ordersActions.setData(data.orders));
  } catch (error) {
    yield put(ordersActions.setStatus(_status.error));
  }
}

export const ordersSelector = (state: RootState) => state.orders.data;
export const ordersStatusSelector = (state: RootState) => state.orders.status;
