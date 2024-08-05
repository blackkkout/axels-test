import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Summary } from './Summary';
import configureStore from 'redux-mock-store';

const theme = createTheme();

const mockStore = configureStore([]);
const initialState = {
  orders: {
    data: [
      {
        id: '1',
        name: 'Test Order',
        price: 100,
        quantity: 1,
        image: 'test.jpg',
      },
    ],
    status: 'success',
    summary: {
      subtotal: 100,
      shipping: 0,
      taxes: 10,
    },
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
}));

describe('Summary', () => {
  it('should render correctly and match snapshot', () => {
    const store = mockStore(initialState);

    const view = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Summary />
        </ThemeProvider>
      </Provider>,
    );

    expect(view).toMatchSnapshot();
  });

  it('should render loading state correctly', () => {
    const loadingState = {
      ...initialState,
      orders: { ...initialState.orders, status: 'loading' },
    };
    const store = mockStore(loadingState);

    const view = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Summary />
        </ThemeProvider>
      </Provider>,
    );

    expect(view).toMatchSnapshot();
  });
});
