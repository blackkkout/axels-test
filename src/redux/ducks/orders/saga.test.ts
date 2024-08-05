import { put } from 'redux-saga/effects';

import { fetchOrders, ordersActions } from './orders';
import { getOrders } from '../../../api/orders';
import { Order } from '../../../types/order';

describe('fetchOrders saga', () => {
  it('should fetch orders successfully', () => {
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
    const generator = fetchOrders();

    expect(generator.next().value).toEqual(
      put(ordersActions.setStatus('loading')),
    );

    expect(generator.next().value).toEqual(getOrders());

    expect(generator.next({ orders: mockOrders }).value).toEqual(
      put(ordersActions.setStatus('success')),
    );

    expect(generator.next().value).toEqual(
      put(ordersActions.setData(mockOrders)),
    );

    expect(generator.next().value).toEqual(
      put(
        ordersActions.setSummary({ subtotal: 100, shipping: 0, taxes: 1.25 }),
      ),
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('should handle errors', () => {
    const generator = fetchOrders();

    generator.next();

    expect(generator.throw(new Error()).value).toEqual(
      put(ordersActions.setStatus('error')),
    );

    expect(generator.next().done).toBeTruthy();
  });
});
