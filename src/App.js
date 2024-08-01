import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Root } from './styled/App';
import { theme } from './styled/config';
import { Billing, Order, Payment, Shipping } from './components';

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Root>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Order />}>
            <Route path="/*" element={<Shipping />} />
            <Route path="billing" element={<Billing />} />
            <Route path="payment" element={<Payment />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Root>
  </ThemeProvider>
);
