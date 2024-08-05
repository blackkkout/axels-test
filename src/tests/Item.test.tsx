import { render } from '@testing-library/react';

import { Item } from '../components/Item';

describe('Item', () => {
  it('should take a snapshot', () => {
    const view = render(
      <Item
        order={{
          id: '1',
          name: 'The Chelsea Boot',
          price: 100,
          shape: 'black',
          quantity: 1,
          image: 'test.png',
        }}
      />,
    );
    expect(view).toMatchSnapshot();
  });
});
