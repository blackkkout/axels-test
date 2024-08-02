import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route, HashRouter } from 'react-router-dom';
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
        <HashRouter>
          <Routes>
            <Route path="/" element={<Order />}>
              <Route index element={<Shipping />} />
              <Route path="billing" element={<Billing />} />
              <Route path="payment" element={<Payment />} />
            </Route>
            <Route path="/confirmation" element={<Order />} />
          </Routes>
        </HashRouter>
      </Root>
    </ThemeProvider>
  </Provider>
);
