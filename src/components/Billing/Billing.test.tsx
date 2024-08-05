import { render } from '@testing-library/react';

import { Billing } from './Billing';

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => jest.fn(),
  useNavigate: () => jest.fn(),
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: () => jest.fn(),
}));

describe('Billing', () => {
  it('should take a snapshot', () => {
    const view = render(<Billing />);
    expect(view).toMatchSnapshot();
  });
});
