import { createAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { put } from 'redux-saga/effects';
import { getOrders } from '../../api/orders';

const _status = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error',
};

const initialState = {
  data: [],
  status: _status.idle,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setData(state, action) {
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

export function* fetchOrders() {
  try {
    yield put(ordersActions.setStatus(_status.loading));
    const data = yield getOrders();
    yield put(ordersActions.setStatus(_status.success));
    yield put(ordersActions.setData(data.orders));
  } catch (error) {
    yield put(ordersActions.setStatus(_status.error));
  }
}
