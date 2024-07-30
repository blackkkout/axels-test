import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { purple } from '@mui/material/colors';

import { Root } from './App.styles';
import { Order } from '../Order/Order';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[800],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Root>
        <Order />
      </Root>
    </ThemeProvider>
  );
}

export default App;
