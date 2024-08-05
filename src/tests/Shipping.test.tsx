import { render } from '@testing-library/react';

import { Shipping } from '../components/Shipping';

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

describe('Shipping', () => {
  it('should take a snapshot', async () => {
    const view = render(<Shipping />);
    expect(view).toMatchSnapshot();
  });
});
