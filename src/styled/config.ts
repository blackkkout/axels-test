import { purple, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material';

export const breakpoints = {
  md: '900px',
} as const;

export const media = {
  md: `@media (max-width: ${breakpoints.md})`,
} as const;

const palette = {
  primary: {
    main: purple[800],
  },
  grey,
};

export const theme = createTheme({
  palette,
});
