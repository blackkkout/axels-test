import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

import { Root } from '../styled/App';
import { palette } from '../styled/config';
import { Order } from './Order';

const theme = createTheme({
  palette,
});

export const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Root>
      <Order />
    </Root>
  </ThemeProvider>
);
