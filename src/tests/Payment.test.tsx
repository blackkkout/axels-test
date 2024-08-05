import { render } from '@testing-library/react';

import { Payment } from '../components/Payment';

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Payment', () => {
  it('should take a snapshot', () => {
    const view = render(<Payment />);
    expect(view).toMatchSnapshot();
  });
});
