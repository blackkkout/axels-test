import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Shipping } from '../Shipping/Shipping';
import { Confirmation } from '../Confirmation/Confirmation';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: () => jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe('Order', () => {
  it('should take a snapshot', () => {
    const view = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Shipping />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(view).toMatchSnapshot();
  });

  it('should take a snapshot for confirmation page', () => {
    const view = render(
      <MemoryRouter initialEntries={['/confirmation']}>
        <Routes>
          <Route path="/" element={<Shipping />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(view).toMatchSnapshot();
  });
});
