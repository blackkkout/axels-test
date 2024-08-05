import { RootState } from '../../store';
import {
  _status,
  ordersSelector,
  ordersStatusSelector,
  ordersSummarySelector,
} from './orders';

describe('orders selectors', () => {
  const mockState: RootState = {
    orders: {
      data: [
        {
          id: '1',
          name: 'The Chelsea Boot',
          price: 100,
          shape: 'black',
          quantity: 1,
          image: 'test.png',
        },
      ],
      status: 'success',
      summary: { subtotal: 100, shipping: 10, taxes: 5 },
    },
  } as RootState;

  it('should select orders data', () => {
    expect(ordersSelector(mockState)).toEqual([
      {
        id: '1',
        name: 'The Chelsea Boot',
        price: 100,
        shape: 'black',
        quantity: 1,
        image: 'test.png',
      },
    ]);
  });

  it('should select orders status', () => {
    expect(ordersStatusSelector(mockState)).toEqual(_status.success);
  });

  it('should select orders summary', () => {
    expect(ordersSummarySelector(mockState)).toEqual({
      subtotal: 100,
      shipping: 10,
      taxes: 5,
    });
  });
});
