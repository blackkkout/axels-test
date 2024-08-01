import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import { Root } from './styled/App';
import { theme } from './styled/config';
import { Billing, Order, Payment, Shipping } from './components';

export const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Order />}>
              <Route index element={<Shipping />} />
              <Route path="billing" element={<Billing />} />
              <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="/confirmation" element={<Order />} />
          </Routes>
        </BrowserRouter>
      </Root>
    </ThemeProvider>
  </Provider>
);
