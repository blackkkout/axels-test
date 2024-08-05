import { Order } from '../../../types/order';
import {
  ordersActions,
  ordersReducer,
  OrdersState,
  _status,
  calculateSummary,
} from './orders';

describe('ordersReducer', () => {
  const initialState: OrdersState = {
    data: [],
    status: _status.idle,
    summary: null,
  };

  it('should handle initial state', () => {
    expect(ordersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setStatus', () => {
    const actual = ordersReducer(
      initialState,
      ordersActions.setStatus(_status.loading),
    );
    expect(actual.status).toEqual(_status.loading);
  });

  it('should handle setData', () => {
    const mockOrders: Order[] = [
      {
        id: '1',
        name: 'The Chelsea Boot',
        price: 100,
        shape: 'black',
        quantity: 1,
        image: 'test.png',
      },
    ];
    const actual = ordersReducer(
      initialState,
      ordersActions.setData(mockOrders),
    );
    expect(actual.data).toEqual(mockOrders);
  });

  it('should handle setSummary', () => {
    const mockSummary = { subtotal: 100, shipping: 10, taxes: 5 };
    const actual = ordersReducer(
      initialState,
      ordersActions.setSummary(mockSummary),
    );
    expect(actual.summary).toEqual(mockSummary);
  });

  it('shhould handle calculateSummary', () => {
    const mockOrders: Order[] = [
      {
        id: '1',
        name: 'The Chelsea Boot',
        price: 100,
        shape: 'black',
        quantity: 1,
        image: 'test.png',
      },
      {
        id: '1',
        name: 'The Chelsea Boot2',
        price: 150,
        shape: 'purple',
        quantity: 2,
        image: 'test2.png',
      },
    ];

    expect(calculateSummary(mockOrders)).toEqual({
      subtotal: 400,
      shipping: 0,
      taxes: 2.5,
    });
  });
});
