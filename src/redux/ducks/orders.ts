import { createAction, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';

import { getOrders } from '../../api/orders';
import { Order } from '../../types/order';
import { RootState } from '../store';

export const _status = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
} as const;

type Status = (typeof _status)[keyof typeof _status];

interface Summary {
  subtotal: number;
  shipping: number;
  taxes: number;
}

export interface OrdersState {
  data: Order[];
  status: Status;
  summary: Summary | null;
}

const initialState: OrdersState = {
  data: [],
  status: _status.idle,
  summary: null,
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
    setSummary(state, action: PayloadAction<Summary>) {
      state.summary = action.payload;
    },
  },
});

export const ordersActions = {
  getData: createAction(`${ordersSlice.name}/getData`),
  setStatus: ordersSlice.actions.setStatus,
  setData: ordersSlice.actions.setData,
  setSummary: ordersSlice.actions.setSummary,
} as const;
export const ordersReducer = ordersSlice.reducer;

export function* fetchOrders(): Generator<any, void, any> {
  try {
    yield put(ordersActions.setStatus(_status.loading));
    const data: { orders: Order[] } = yield getOrders();
    yield put(ordersActions.setStatus(_status.success));
    yield put(ordersActions.setData(data.orders));
    yield put(ordersActions.setSummary(calculateSummary(data.orders)));
  } catch (error) {
    yield put(ordersActions.setStatus(_status.error));
  }
}

export function calculateSummary(orders: Order[]): Summary {
  return {
    subtotal: orders.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0,
    ),
    shipping: 0,
    taxes: orders.length * 1.25,
  };
}

export const ordersSelector = (state: RootState) => state.orders.data;
export const ordersStatusSelector = (state: RootState) => state.orders.status;
export const ordersSummarySelector = (state: RootState) => state.orders.summary;
